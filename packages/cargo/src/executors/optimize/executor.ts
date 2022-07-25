import { ExecutorContext } from "@nrwl/devkit";

import { parseCargoArgs, runWasmOpt } from "../../common";
import CLIOptions from "./schema";

export default async function (opts: CLIOptions, ctx: ExecutorContext) {
	try {
		let args = parseCargoArgs(opts, ctx);
		await runWasmOpt(args, ctx);
		return { success: true };
	} catch (err) {
		return {
			success: false,
			reason: err?.message,
		};
	}
}
