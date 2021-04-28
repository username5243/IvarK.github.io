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
		if (data === undefined) data = pos.setup()
		pos.save = data

		if (!data.on) {
			data.amt = 0
			data.eng = 0
		}
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
	on() {
		return pos.unl() && pos.save.on
	},
	toggle() {
		pos.save.on = !pos.save.on
		quantum(false, true)
	},
	types: {
		ng: {
			pow() {
				return 1
			},
			sacGals(pow) {
				return pow
			},
			qeToGals(qe) {
				return pow * pow * 100
			},
			galsToQE(gals) {
				return Math.sqrt(gals / 100)
			},
			pcGain(gals) {
				return gals
			}
		},
		rg: {
			pow() {
				return 0
			},
			sacGals(pow) {
				return pow
			},
			qeToGals(qe) {
				return pow * pow * 100
			},
			galsToQE(gals) {
				return Math.sqrt(gals / 100)
			},
			pcGain(gals) {
				return gals
			}
		},
		eg: {
			pow() {
				return 0
			},
			sacGals(pow) {
				return pow
			},
			qeToGals(qe) {
				return pow * pow * 100
			},
			galsToQE(gals) {
				return Math.sqrt(gals / 100)
			},
			pcGain(gals) {
				return gals
			}
		},
		tg: {
			pow() {
				return 0
			},
			sacGals(pow) {
				return pow
			},
			qeToGals(qe) {
				return pow * pow * 100
			},
			galsToQE(gals) {
				return Math.sqrt(gals / 100)
			},
			pcGain(gals) {
				return gals
			}
		}
	},
	updateTmp() {
		let data = {}
		pos.tmp = data

		if (!pos.unl()) return

		let qeMax = tmp.qu.quarkEnergy / 5
		let qeMultMax = Math.sqrt(getQuantumEnergyMult())

		if (pos.on()) {
			let mdbs = Math.floor(player.meta.resets / 5)
			let max_mdbs = Math.floor(qeMultMax * qeMultMax * 4)

			data.sac_mdb = Math.min(mdbs, max_mdbs)
			data.sac_qem = Math.sqrt(data["sac_mdb"] / 4)
			pos.save.amt = Math.pow(data.sac_mdb * 15, 2)
		} else {
			data.sac_mdb = 0
			data.sac_qem = 0
			pos.save.amt = 0
		}

		let types = ["ng", "rg", "eg", "tg"]
		for (var i = 0; i < types.length; i++) {
			var type = types[i]
			var save_data = pos.save.gals[type]
			data["pow_" + type] = pos.types[type].pow() * pos.save.amt

			save_data.sac = Math.min(pos.types[type].sacGals(data["pow_" + type]), pos.types[type].qeToGals(qeMax))
			save_data.qe = pos.types[type].galsToQE(save_data.sac)
			save_data.pc = pos.types[type].pcGain(save_data.sac)
		}
	},
	updateTab() {
		enB.updateOnTick("pos")

		getEl("pos_formula").innerHTML = pos.save.on ? getFullExpansion(pos.tmp.sac_mdb) + " MDBs + " + shorten(pos.tmp.sac_qem) + "x QE multiplier -><br>" : ""
		getEl("pos_toggle").textContent = pos.save.on ? "ON" : "OFF"
		getEl("pos_amt").textContent = getFullExpansion(pos.save.amt)

		let types = ["ng", "rg", "eg", "tg"]
		let data = pos.save.gals
		for (var i = 0; i < types.length; i++) {
			var type = types[i]
			var typeData = pos.save.gals[type]

			getEl("pos_pow_" + type).textContent = shorten(pos.tmp["pow_" + type])
			getEl("pos_gals_" + type).textContent = shorten(typeData.sac)
			getEl("pos_eng_" + type).textContent = shorten(typeData.qe)
			getEl("pos_char_" + type).textContent = shorten(typeData.pc)
		}
	
		if (enB.has("pos", 3)) getEl("enB_pos3_exp").textContent = "^" + (1 / tmp.enB.pos3).toFixed(Math.floor(3 + Math.log10(tmp.enB.pos3)))
	}
}
let pos = POSITRONS