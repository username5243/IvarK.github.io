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

	let amt = Math.floor(player.meta.resets / 4)
	getEl("sac_mdb").className = "gluonupgrade " + (amt <= tmp.qu.pos.sacBoosts ? "unavailablebtn" : "storebtn")
	getEl("sac_mdb").textContent = "Sacrifice " + shortenDimensions(amt - tmp.qu.pos.sacBoosts) + " Meta-Dimension Boosts to gain " + shortenDimensions(getPositronAmt(amt) - tmp.qu.pos.amt) + " Positrons"
	getEl("positrons_amt").textContent = shortenDimensions(tmp.qu.pos.amt)
}

function sacrificeMDBs() {
	let amt = Math.floor(player.meta.resets / 4)
	if (amt <= tmp.qu.pos.sacBoosts) return
	tmp.qu.pos.sacBoosts = amt
	tmp.qu.pos.amt = getPositronAmt(amt)

	player.meta.antimatter = getMetaAntimatterStart()
	clearMetaDimensions()
}

function getPositronAmt(x) {
	return Math.pow(x, 2)
}