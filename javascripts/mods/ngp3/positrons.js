function setupPositronSave() {
	return {
		amt: 0,
		sacBoosts: 0,
		sacGals: 0,
		consumedQE: 0,
		eng: 0,
		boosts: 0
	}
}

function updatePositronsTab() {
	ENTANGLED_BOOSTS.updateOnTick("pos")

	let amt = getMaxConvertableMDBs()
	getEl("sac_mdb").className = "gluonupgrade " + (amt == 0 ? "unavailablebtn" : "storebtn")
	getEl("sac_mdb").textContent = "Sacrifice " + shortenDimensions(amt) + " Meta-Dimension Boosts and " + shorten(0) + " Quantum Energy to gain " + shortenDimensions(getPositronAmt(tmp.qu.pos.sacBoosts + amt) - tmp.qu.pos.amt) + " Positrons"
	getEl("positrons_amt").textContent = shortenDimensions(tmp.qu.pos.amt)
}

function getMaxConvertableMDBs() {
	let x = Math.floor(player.meta.resets / 4)
	let diff = x - tmp.qu.pos.sacBoosts

	return Math.max(diff, 0)
}

function getConvertibleMDBsFromQE(x) {
	return 0
}

function getQEFromConvertedMDBs(x) {
	return 0
}

function sacrificeMDBs() {
	let amt = getMaxConvertableMDBs()
	if (amt == 0) return

	tmp.qu.pos.sacBoosts += amt
	tmp.qu.pos.consumedQE += getQEFromConvertedMDBs(tmp.qu.pos.sacBoosts) - getQEFromConvertedMDBs(tmp.qu.pos.sacBoosts - amt)
	tmp.qu.pos.amt = getPositronAmt(tmp.qu.pos.sacBoosts)

	player.meta.antimatter = getMetaAntimatterStart()
	clearMetaDimensions()
}

function getPositronAmt(x) {
	return Math.pow(x, 2)
}