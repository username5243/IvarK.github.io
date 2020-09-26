let GDs = {
	setup() {
		let data = {
			unl: false,
			gv: 0,
			gr: 0,
			gsc: 0,
			gdBoosts: 0,
			rdBoosts: 0
		}
		this.save = data

		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = 0
			data["rd" + d] = 0
		}
		return data
	},
	compile() {
		delete this.save
		if (!player.ghostify || !player.ghostify.gds) return

		data = player.ghostify.gds
		this.save = data

		data.gv = new Decimal(data.gv)
		data.gr = new Decimal(data.gr)
		data.gsc = new Decimal(data.gsc)
		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = new Decimal(data["gd" + d])
			data["rd" + d] = new Decimal(data["rd" + d])
		}
	},
	updateTmp() {
		let data = {}
		this.tmp = data

		if (!this.unlocked()) return

		data.gdm = Decimal.max(tmp.bl.speed, 1).log10() + 1 //Determine the initial multiplier for Gravity Dimensions.

		//Gravity Power
		let gp = this.save.gv.max(1).log10() / Math.sqrt(this.save.gr.max(1).log10() + 1)
		if (gp > 10) {
			//Endless Radioactive softcaps! :D
			let layer = Math.floor(Math.log2(gp / 10 + 1))
			gp = layer * 10 + (gp / 10 - Math.pow(2, layer) + 1) / Math.pow(2, layer) * 10
			data.gpr = layer
		} else data.gpr = 0
		data.gp = gp

		//Gravity Energy
		data.gem = 1 //Determine GE / GP
		data.ge = data.gem * gp //GP * GE / GP => GE (DO NOT EVER SOFTCAP THiS!)

		//Gravity Energy boosts...
		data.rep = data.ge + 1 // Boosts Replicate Interval.
		data.nf = data.ge + 1 // Boosts Nanospeed.
		data.tod = data.ge + 1 // Boosts Branch Speed.
		data.bl = data.ge + 1 // Boosts Bosonic Speed.
	},
	updateDisplay() {
		for (var d = 1; d <= 4; d++) {
			if (this.save.gdBoosts + 1 >= d) {
				document.getElementById("gd" + d).textContent = DISPLAY_NAMES[d] + " Gravity Dimension ^" + this.gdExp(d)
				document.getElementById("gd" + d + "Amount").textContent = shortenDimensions(this.save["gd" + d])
			}
			if (this.save.rdBoosts + 1 >= d) document.getElementById("rd" + d + "Amount").textContent = shortenDimensions(this.save["rd" + d])
		}

		document.getElementById("gv").textContent = shortenMoney(this.save.gv)
		document.getElementById("gr").textContent = shortenMoney(this.save.gr)
		document.getElementById("gvPow").textContent = this.tmp.gp.toFixed(2)
		document.getElementById("gvPowScaling").textContent = (this.tmp.gpr == 0 ? "" : this.tmp.gpr == 1 ? "Radioactive " : "Radioactive^" + getFullExpansion(this.tmp.gpr) + " ") + "Power"
		document.getElementById("gvEne").textContent = this.tmp.ge.toFixed(2)
		document.getElementById("gvEneMult").textContent = this.tmp.gem.toFixed(2)
		document.getElementById("gvRadio").style.display = this.tmp.gpr >= 1 ? "" : "none"
		if (this.tmp.gpr >= 1) {
			document.getElementById("gvRadioExp").textContent = this.tmp.gpr >= 2 ? "^" + getFullExpansion(this.tmp.gpr) : ""
			document.getElementById("gvRadioPow").textContent = getFullExpansion(Math.floor(this.radioactivity(this.tmp.gpr)))
		}

		document.getElementById("gvToRep").textContent = this.tmp.rep.toFixed(2)
		document.getElementById("gvToNf").textContent = this.tmp.nf.toFixed(2)
		document.getElementById("gvToTod").textContent = this.tmp.tod.toFixed(2)
		document.getElementById("gvToBl").textContent = this.tmp.bl.toFixed(2)
	},
	can() {
		return player.totalmoney.log10() >= 1e18 && player.ghostify.hb.higgs >= 20
	},
	reqText() {
		return shortenCosts(Decimal.pow(10, 1e18)) + " antimatter and " + getFullExpansion(20) + " Higgs Bosons"
	},
	unl() {
		if (this.unlocked()) return
		if (!this.can()) return

		this.save.unl = true
		$.notify("Congratulations! You have unlocked Gravity Dimensions!", "success")
		giveAchievement("The Gravitational Well")
		updateBosonUnlockDisplay()
		this.unlDisplay()
	},
	unlDisplay() {
		let unl = this.unlocked()
		document.getElementById("gdtabbtn").style.display = unl ? "" : "none"
		if (!unl) return

		for (var d = 1; d <= 4; d++) {
			document.getElementById("gd" + d + "Row").style.visibility = this.save.gdBoosts + 1 >= d ? "" : "hidden"
			document.getElementById("rd" + d + "Row").style.visibility = this.save.rdBoosts + 1 >= d ? "" : "hidden"
		}
	},
	unlocked() {
		return this.save && this.save.unl
	},
	blExpanded() {
		return this.unlocked() && this.save.gd1.bought > 0
	},
	isRadioactiveActive(layer) {
		return this.tmp.gpr >= layer
	},
	radioactivity(layer) {
		if (!this.isRadioactiveActive(layer)) return
		return (this.tmp.gp - layer * 10) * Math.pow(this.save.gr.max(1).log10(), 2)
	},
	gdExp(dim) {
		return 1
	}
}