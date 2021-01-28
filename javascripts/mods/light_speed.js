let LIGHT_SPEED = {
	mult(id) {
		let data = tmp.mod.ls
		return (data && data[id]) || 1
	},
	options: ["game", "rep", "nf", "tod", "bl"],
	reqs: {
		game() {
			return true
		},
		rep() {
			return player.replicanti.unl || ph.did("eternity")
		},
		nf() {
			return tmp.ngp3 && player.masterystudies.includes("d11")
		},
		tod() {
			return tmp.ngp3 && player.masterystudies.includes("d12")
		},
		gph() {
			return tmp.ngp3 && player.ghostify.ghostlyPhotons.unl
		},
		bl() {
			return tmp.ngp3 && player.ghostify.wzb.unl
		},
	},
	reset() {
		let shown = tmp.mod.ls !== undefined
		getEl("lstabbtn").style.display = shown ? "" : "none"
		if (!shown) return

		for (var i = 0; i < ls.options.length; i++) ls.updateOption(ls.options[i])
	},
	updateOption(id) {
		let unl = ls.reqs[id]()
		getEl("ls_" + id).parentElement.style.display = unl ? "" : "none"
		if (!unl) return

		let speed = ls.mult(id)
		getEl("ls_" + id).value = Math.round(Math.log10(speed) * 10)
		getEl("ls_" + id + "_text").textContent = speed.toFixed(2)
	},
	changeOption(id) {
		let speed = Math.pow(10, getEl("ls_" + id).value / 10)
		getEl("ls_" + id + "_text").textContent = speed.toFixed(2)
		if (speed == 1) delete tmp.mod.ls[id]
		else tmp.mod.ls[id] = speed
	}
}
let ls = LIGHT_SPEED