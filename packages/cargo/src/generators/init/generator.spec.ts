import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { Tree } from "@nrwl/devkit";

import runGenerator from "./generator";

describe("cargo generator", () => {
	let appTree: Tree;

	beforeEach(() => {
		appTree = createTreeWithEmptyWorkspace();
	});

	it("should run successfully", async () => {
		await runGenerator(appTree, {});
		let changes = appTree.listChanges();

		let cargoToml = changes.find(c => c.path === "Cargo.toml");
		let toolchainToml = changes.find(c => c.path === "rust-toolchain.toml");
		let rustfmtToml = changes.find(c => c.path === "rustfmt.toml");

		expect(cargoToml).toBeTruthy();
		expect(toolchainToml).toBeTruthy();
		expect(rustfmtToml).toBeTruthy();

		let content = toolchainToml?.content!.toString();
		expect(content).toContain(`channel = "stable"`);
	});

	it("should respect the 'toolchain' CLI option", async () => {
		await runGenerator(appTree, { toolchain: "nightly" });
		let toolchainToml = appTree
			.listChanges()
			.find(c => c.path === "rust-toolchain.toml")!
			.content!.toString();

		expect(toolchainToml).toContain(`channel = "nightly"`);
	});
});
