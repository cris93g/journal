const { app, BrowserWindow, Menu, dialog } = require("electron");
const fs = require("fs");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({ width: 800, height: 600 });

	// and load the index.html of the app.
	win.loadURL("http://localhost:3000/");
	const template = [
		{
			label: "File",
			submenu: [
				{
					label: "Open File",
					accelerator: "CmdOrCtrl+O",
					click() {
						openFile();
					}
				},
				{
					label: "Open Folder"
				}
			]
		},
		{
			label: "SuckIt",
			submenu: [
				{
					label: "ITS a Joke"
				},
				{
					label: "Open Folder"
				}
			]
		},
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ type: "separator" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
				{ role: "pasteandmatchstyle" },
				{ role: "delete" },
				{ role: "selectall" }
			]
		},
		{
			label: "View",
			submenu: [
				{ role: "reload" },
				{ role: "forcereload" },
				{ role: "toggledevtools" },
				{ type: "separator" },
				{ role: "resetzoom" },
				{ role: "zoomin" },
				{ role: "zoomout" },
				{ type: "separator" },
				{ role: "togglefullscreen" }
			]
		},
		{
			role: "window",
			submenu: [{ role: "minimize" }, { role: "close" }]
		},
		{
			role: "help",
			submenu: [
				{
					label: "Learn More",
					click() {
						require("electron").shell.openExternal("https://electronjs.org");
					}
				}
			]
		}
	];
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	if (process.platform === "darwin") {
		template.unshift({
			label: app.getName(),
			submenu: [
				{ role: "about" },
				{ type: "separator" },
				{ role: "services", submenu: [] },
				{ type: "separator" },
				{ role: "hide" },
				{ role: "hideothers" },
				{ role: "unhide" },
				{ type: "separator" },
				{ role: "quit" }
			]
		});

		// Edit menu
		template[2].submenu.push(
			{ type: "separator" },
			{
				label: "Speech",
				submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
			}
		);

		// Window menu
		template[4].submenu = [
			{ role: "close" },
			{ role: "minimize" },
			{ role: "zoom" },
			{ type: "separator" },
			{ role: "front" }
		];
	}

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//OPEN FILE
function openFile() {
	//opens dialog looking for markdown
	const files = dialog.showOpenDialog(win, {
		properties: ["openFile"],
		filters: [
			{
				name: "Markdow",
				extensions: ["md", "markdown", "txt"]
			}
		]
	});
	//if no files
	if (!files) return;
	const file = files[0];
	const fileContent = fs.readFileSync(file).toString();
	console.log(fileContent);
}
