const fs = require("fs");
const { cp } = require("fs/promises");
const path = require("path");
const util = require("util");

const prompts = require("prompts");
const { red, green, cyan, bold } = require("kleur/colors");

const { parseArgs } = util;

async function init() {
	console.log(`${green("---任务开始---")}`);
	const cwd = process.cwd();
	console.log("cwd", cwd);

	let result = {
		projectName: "vue3-template",
	};

	try {
		result = await prompts([
			{
				name: "projectName",
				type: "text",
				message: "请输入项目名称：",
				initial: result.projectName,
			},
		]);

		// 要复制的源文件名， 复制操作的目标文件名
		const { projectName } = result;
		const root = path.join(cwd, "/", "template");
		const dest = path.join(cwd, "../", projectName);
		console.log(root, dest);

		if (!fs.existsSync(dest)) {
			fs.mkdirSync(dest);

			cp(root, dest, { recursive: true })
				.then(() => {
					console.log(`${green("---任务结束---")}`);
				})
				.catch((err) => {
					console.error("任务出错:", err);
				});
		} else {
			throw Error(`${projectName}文件夹已存在，请删除后重试！`);
		}
	} catch (cancelled) {
		console.log(cancelled.message);
		process.exit(1);
	}
}

init().catch((e) => {
	console.error(e);
});
