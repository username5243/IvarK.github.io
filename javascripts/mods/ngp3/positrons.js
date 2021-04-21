let POSITRONS = {
	setup() {
		return {
			amt: 0,
			eng: 0,
			boosts: 0,

			sacBoosts: 0,
			consumedQE: 0
		}
	},
	compile() {
		pos.save = undefined
		if (tmp.qu === undefined) return

		let data = tmp.qu.pos
		if (data === undefined) return
		pos.save = data

		if (!data.boosts) data.boosts = 0
		if (!data.gals) data.gals = {
			ng: {sac: 0, qe: 0, pc: 0},
			rg: {sac: 0, qe: 0, pc: 0},
			eg: {sac: 0, qe: 0, pc: 0},
			tg: {sac: 0, qe: 0, pc: 0}
		}
		data.eng = data.gals.ng.pc + data.gals.rg.pc + data.gals.eg.pc + data.gals.tg.pc

		if (data.sacGals) delete data.sacGals
	},
	unl() {
		return pos.save && masteryStudies.has("d7")
	},
	updateTab() {
		ENTANGLED_BOOSTS.updateOnTick("pos")

		let amt = getMaxConvertableMDBs()
		getEl("sac_mdb").className = "gluonupgrade " + (amt == 0 ? "unavailablebtn" : "storebtn")
		getEl("sac_mdb").textContent = "Convert " + shortenDimensions(amt) + " Meta-Dimension Boosts and " + shorten(0) + " Quantum Energy for +" + shortenDimensions(getPositronAmt(pos.save.sacBoosts + amt) - pos.save.amt) + " Positrons"
		getEl("positrons_amt").textContent = shortenDimensions(pos.save.amt)

		let types = ["ng", "rg", "eg", "tg"]
		let data = pos.save.gals
		for (var i = 0; i < types.length; i++) {
			var type = types[i]
			var typeData = pos.save.gals[type]

			getEl("pos_pow_" + type).textContent = shorten(0)
			getEl("pos_gals_" + type).textContent = shorten(typeData.sac)
			getEl("pos_eng_" + type).textContent = shorten(typeData.qe)
			getEl("pos_char_" + type).textContent = shorten(typeData.pc)
		}
	}
}
let pos = POSITRONS

function getMaxConvertableMDBs() {
	let x = Math.floor(player.meta.resets / 4)
	let diff = x - pos.save.sacBoosts

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

	pos.save.sacBoosts += amt
	pos.save.consumedQE += getQEFromConvertedMDBs(pos.save.sacBoosts) - getQEFromConvertedMDBs(pos.save.sacBoosts - amt)
	pos.save.amt = getPositronAmt(pos.save.sacBoosts)

	player.meta.antimatter = getMetaAntimatterStart()
	clearMetaDimensions()
}

function getPositronAmt(x) {
	return Math.pow(x, 2)
}