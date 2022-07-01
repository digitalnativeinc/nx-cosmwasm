import * as nrwl from "@nrwl/devkit";
import { Tree } from "@nrwl/devkit";
import * as path from "path";
import * as fs from "fs"

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
				executor: "nxcw:build",
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
				executor: "nxcw:test",
				options: {},
			},
			lint: {
				executor: "nxcw:clippy",
				options: {
					fix: false,
					failOnWarnings: true,
					noDeps: true,
				},
			},
			wasm: {
				executor: "nxcw:wasm",
				options: {
					release: true,
					target: "wasm32-unknown-unknown"
				},
				configurations: {
					production: {
						release: true,
						target: "wasm32-unknown-unknown"
					},
				},
			},
			optimize: {
				executor: "nxcw:optimize",
				options: {},
			},
			schema: {
				executor: "nxcw:schema",
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
