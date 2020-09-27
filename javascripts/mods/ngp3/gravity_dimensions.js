let GDs = {
	setup() {
		let data = {
			unl: false,
			gv: new Decimal(0),
			gr: new Decimal(0),
			gsc: new Decimal(0),
			gdBoosts: 0,
			rdTick: new Decimal(0)
		}
		this.save = data

		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = new Decimal(1)
			data["rd" + d] = new Decimal(1)
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
		data.rdTick = new Decimal(data.rdTick)
		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = Decimal.max(data["gd" + d], 1)
			data["rd" + d] = Decimal.max(data["rd" + d], 1)
		}
		data.gdBoosts = parseInt(data.gdBoosts)
		delete data.rdBoosts
	},
	updateTmp() {
		let data = {}
		this.tmp = data

		if (!this.unlocked()) return

		data.gdm = Decimal.max(tmp.bl.speed, 1).log10() + 1 //Determine the initial multiplier for Gravity Dimensions.

		//Gravity Power
		let gp = Math.pow(Math.max(Math.pow(this.save.gv.add(10).log10(), 3/2) - this.save.gr.add(10).log10(), 0), 2/3)
		if (gp > 10) {
			//Endless Radioactive softcaps! :D
			let layer = Math.floor(Math.log2(gp / 10 + 1))
			gp = layer * 10 + (gp / 10 - Math.pow(2, layer) + 1) / Math.pow(2, layer) * 10
			data.gpr = layer
		} else data.gpr = 0
		data.gp = gp

		//Gravity Energy
		data.gem = this.energyMult() //Determine GE / GP
		data.ge = data.gem * gp //GP * GE / GP => GE (DO NOT EVER SOFTCAP THiS!)

		//Gravity Energy boosts...
		data.rep = data.ge + 1 // Boosts Replicate Interval.
		data.nf = data.ge + 1 // Boosts Nanospeed.
		data.tod = data.ge + 1 // Boosts Branch Speed.
		data.bl = data.ge + 1 // Boosts Bosonic Speed.
	},
	updateDisplay() {
		document.getElementById("gdWatt").textContent = shorten(tmp.bl.speed)
		document.getElementById("gdMult").textContent = shorten(this.tmp.gdm)
		document.getElementById("gvRate").textContent = "+" + shortenMoney(Decimal.pow(this.tmp.gdm, this.gdExp(1)).times(this.save.gd1)) + "/s"
		document.getElementById("gdBoostDesc").textContent = "Gravity Dimension " + (this.save.gdBoosts >= 4 ? "Boost" : "Shift") + " (" + getFullExpansion(this.save.gdBoosts) + "): requires " + shortenDimensions(this.gdBoostReq()) + " Gravity Radiation"
		document.getElementById("gdBoost").className = this.save.gr.gte(this.gdBoostReq()) ? "storebtn" : "unavailablebtn"
		document.getElementById("rdTick").textContent = shortenDimensions(this.save.rdTick)
		document.getElementById("rdNextTick").textContent = shorten(this.rdNextTickAt())
		for (var d = 1; d <= 4; d++) {
			if (this.save.gdBoosts + 1 >= d) {
				document.getElementById("gd" + d).textContent = DISPLAY_NAMES[d] + " Gravity Dimension ^" + this.gdExp(d).toFixed(2)
				document.getElementById("gd" + d + "Amount").textContent = shortenDimensions(this.save["gd" + d])
			}
			document.getElementById("rd" + d + "Amount").textContent = shortenDimensions(this.save["rd" + d])
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
		return player.totalmoney.log10() >= 1e18 && player.ghostify.hb.higgs >= 25
	},
	reqText() {
		return shortenCosts(Decimal.pow(10, 1e18)) + " antimatter and " + getFullExpansion(25) + " Higgs Bosons"
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

		for (var d = 1; d <= 4; d++) document.getElementById("gd" + d + "Row").style.visibility = this.save.gdBoosts + 1 >= d ? "" : "hidden"
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
	energyMult() {
		return 1
	},
	gdTick(diff) {
		for (var d = Math.min(this.save.gdBoosts + 1, 4); d >= 1; d--) {
			let add = Decimal.pow(this.tmp.gdm, this.gdExp(d)).times(this.save["gd" + d])
			if (d == 1) this.save.gv = this.save.gv.add(add.times(diff))
			else this.save["gd" + (d - 1)] = this.save["gd" + (d - 1)].add(add.times(diff / 10))
		}
	},
	gdExp(dim) {
		return 1
	},
	gdBoost(x) {
		if (!this.save.gr.gte(this.gdBoostReq())) return
		this.save.gdBoosts++
		this.unlDisplay()
	},
	gdBoostReq(x) {
		if (x === undefined) x = this.save.gdBoosts
		return Decimal.pow(10, x * 3 + 5)
	},
	rdNextTickAt() {
		return this.save.rdTick.add(1).pow(2).times(30)
	},
	rdTargetTick() {
		return Decimal.div(tmp.bl.speed, 30).sqrt().floor()
	},
	gainRDTicks() {
		let target = this.rdTargetTick()
		if (this.save.rdTick.gte(target)) return
		this.rdTick(target.sub(this.save.rdTick))
		this.save.rdTick = target
	},
	rdTick(diff) {
		for (var d = 4; d >= 1; d--) {
			if (d == 1) this.save.gr = this.save.gr.add(this.save["rd" + d].times(diff))
			else this.save["rd" + (d - 1)] = this.save["rd" + (d - 1)].add(this.save["rd" + d].div(10).times(diff))
		}
	},
	dimReset() {
		let data = this.save
		if (!GDs.unlocked()) return

		data.gv = new Decimal(0)
		data.gr = new Decimal(0)
		data.rdTick = new Decimal(0)
		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = new Decimal(1)
			data["rd" + d] = new Decimal(1)
		}
	},
	reset(unl) {
		if (!unl && document.getElementById("gdims").style.display != "none") showDimTab("antimatterdimensions")
		player.ghostify.gv = this.setup()
		this.save.unl = unl
		this.unlDisplay()
	}
}