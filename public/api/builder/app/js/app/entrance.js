document.getElementsByTagName("html")[0].style.overflow = "hidden";

//var loader = Stashy.Loader('#entrance--window');
//loader.on("absolute", "200px", "#fff", "prepend");

var accordion,
	entranceInterval = setInterval(function () {
		const obj = {hello: 'world'};
const blobObj = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
window.customFile = blobObj;
		if (typeof accordion === "undefined" || !accordion) {
			accordion = document.getElementById("addons");
			return;
		}

		if (hasScrollBar()) {
			document.getElementsByTagName("html")[0].style.overflow = "visible";
			document.getElementById("entrance--window").removeAttribute("id");

			clearInterval(entranceInterval);
			document.getElementById("loader").remove();
			//loader.off();
		}

		// TODO:fetchurl
		const url = window.location.href.split("/");
		var token = url[url.length - 1];
		if (token[token.length - 1] === "#") {
			token = token.slice(0, -1);
		}

		fetch("http://localhost:8000/api/builder/getFile", { headers: { "x-auth": token } })
			.then((e) => {
				console.log(e.status);
				if (e.status !== 200) {
					return window.location.replace("http://localhost:3000/rootui/react#/");
				}
				return e.blob();
			})
			.then((e) => {
				window.localStorage.clear();
				console.log(`object`, e);
				console.log(`object21`, window.customFile);
				document.getElementsByTagName("html")[0].style.overflow = "visible";
				document.getElementById("entrance--window").removeAttribute("id");
				clearInterval(entranceInterval);
				document.getElementById("loader").remove();

				e.name = "1.qbx";
				window.customFile = e;
				console.log(`object2`, window.customFile);
				
				document.getElementById("importQbx").click();
				
			})
			.catch((e) => {
				window.location.replace("http://localhost:3000/rootui/react#/");
			});
		//loader.off();
	}, 3000);

function hasScrollBar() {
	return accordion.scrollHeight > accordion.clientHeight;
}
