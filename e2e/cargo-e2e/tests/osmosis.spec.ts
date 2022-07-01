import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate cargo:cosmwasm", () => {
	it("should create a new Cosmwasm smart contract", async () => {
		let cosmwasm = nrwl.uniq("cargo");
		nrwl.ensureNxProject("@digitalnative/cosmwasm", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`generate @digitalnative/cosmwasm:osmosis ${cosmwasm}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${cosmwasm}/src/lib.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/msg.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/state.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/contract.rs`);
		}).not.toThrow();
	}, 120000);
	it("should compile into wasm", async () => {
		let cosmwasm = nrwl.uniq("cargo");
		nrwl.ensureNxProject("@digitalnative/cosmwasm", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`generate @digitalnative/cosmwasm:osmosis ${cosmwasm}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${cosmwasm}/src/lib.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/msg.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/state.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/contract.rs`);
		}).not.toThrow();
	}, 120000);
	it("should generate schema", async () => {
		let cosmwasm = nrwl.uniq("cargo");
		nrwl.ensureNxProject("@digitalnative/cosmwasm", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`generate @digitalnative/cosmwasm:osmosis ${cosmwasm}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${cosmwasm}/src/lib.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/msg.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/state.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/contract.rs`);
		}).not.toThrow();
	}, 120000);
	
});
