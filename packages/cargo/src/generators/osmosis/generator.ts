import * as nrwl from "@nrwl/devkit";
import { Tree } from "@nrwl/devkit";
import * as path from "path";

import {
	GeneratorOptions,
	normalizeGeneratorOptions,
	updateWorkspaceMembers,
} from "../../common";
import cargoInit from "../init/generator";
import CLIOptions from "./schema";

// prettier-ignore
type Options = CLIOptions & GeneratorOptions;

export default async function (host: Tree, opts: CLIOptions) {
	let options = normalizeGeneratorOptions("contract", host, opts);

	nrwl.addProjectConfiguration(host, options.projectName, {
		root: options.projectRoot,
		projectType: "library",
		sourceRoot: `${options.projectRoot}/src`,
		targets: {
			build: {
				executor: "@digitalnative/cosmwasm:build",
				options: {
					release: false,
				},
				configurations: {
					production: {
						release: true,
					},
				},
			},
			test: {
				executor: "@digitalnative/cosmwasm:test",
				options: {},
			},
			lint: {
				executor: "@digitalnative/cosmwasm:clippy",
				options: {
					fix: false,
					failOnWarnings: true,
					noDeps: true,
				},
			},
			wasm: {
				executor: "@digitalnative/cosmwasm:wasm",
				options: {},
			},
			optimize: {
				executor: "@digitalnative/cosmwasm:optimize",
				options: {},
			},
			schema: {
				executor: "@digitalnative/cosmwasm:schema",
				options: {},
			}
		},
		tags: options.parsedTags,
	});

	await addFiles(host, options);
	updateWorkspaceMembers(host, options);
	await nrwl.formatFiles(host);
}

async function addFiles(host: Tree, opts: Options) {
	if (!host.exists("Cargo.toml")) {
		await cargoInit(host, {});
	}

	let substitutions = {
		projectName: opts.projectName,
		template: "",
	};

	nrwl.generateFiles(
		host,
		path.join(__dirname, "files"),
		opts.projectRoot,
		substitutions
	);
}
