import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate cargo:cosmwasm", () => {
	it("should create a new Cosmwasm smart contract", async () => {
		let cosmwasm = nrwl.uniq("cargo");
		nrwl.ensureNxProject("@digitalnative/cosmwasm", "dist/packages/cargo");

		await nrwl.runNxCommandAsync(`generate @digitalnative/cosmwasm:contract ${cosmwasm}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${cosmwasm}/src/lib.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/amount.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/ibc.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/migrations.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/msg.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/state.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/test_helpers.rs`);
            nrwl.checkFilesExist(`contracts/${cosmwasm}/src/contract.rs`);
		}).not.toThrow();
	}, 120000);
});
