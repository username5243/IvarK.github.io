let POSITRONS = {
	setup() {
		return {
			amt: 0,
			eng: 0,
			boosts: 0
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
		data.consumedQE = data.gals.ng.qe + data.gals.rg.qe + data.gals.eg.qe + data.gals.tg.qe

		if (data.sacGals) delete data.sacGals
		if (data.sacBoosts) delete data.sacBoosts
	},
	unl() {
		return tmp.quActive && pos.save && masteryStudies.has("d7")
	},
	toggle() {
		pos.save.on = !pos.save.on
		quantum(false, true)
	},
	updateTab() {
		enB.updateOnTick("pos")

		getEl("pos_formula").innerHTML = pos.save.on ? "0 MDBs + 0.00x QE multiplier -><br>" : ""
		getEl("pos_toggle").textContent = pos.save.on ? "ON" : "OFF"
		getEl("pos_amt").textContent = getFullExpansion(pos.save.amt)

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
	
		if (enB.has("pos", 3)) getEl("enB_pos3_exp").textContent = "^" + (1 / tmp.enB.pos3).toFixed(Math.floor(3 + Math.log10(tmp.enB.pos3)))
	}
}
let pos = POSITRONS