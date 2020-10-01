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
		GDs.save = data

		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = new Decimal(1)
			data["rd" + d] = new Decimal(1)
		}
		return data
	},
	compile() {
		delete GDs.save
		if (!player.ghostify || !player.ghostify.gds) return

		data = player.ghostify.gds
		GDs.save = data

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

		GDs.chargeDisplay()
	},
	updateTmp() {
		let data = {}
		GDs.tmp = data

		if (!GDs.unlocked()) return

		data.gdm = tmp.bl.speed.div(10).add(1).log10() //Determine the initial multiplier for Gravity Dimensions.

		//Gravity Power
		let gp = Math.pow(Math.max(Math.pow(GDs.save.gv.max(1).log10(), 3/2) - GDs.save.gr.add(10).log10(), 0), 2/3)
		if (gp > 10) {
			//Endless Radioactive softcaps! :D
			let layer = Math.floor(Math.log2(gp / 10 + 1))
			gp = layer * 10 + (gp / 10 - Math.pow(2, layer) + 1) / Math.pow(2, layer) * 10
			data.gpr = layer
		} else data.gpr = 0
		data.gp = gp

		//Gravity Energy
		data.gem = GDs.energyMult() //Determine GE / GP
		data.ge = data.gem * gp //GP * GE / GP => GE (DO NOT EVER SOFTCAP THIS!)

		//Gravity Charge
		data.gc = GDs.chargeMult()
		data.gsc = GDs.superchargeMult()

		//Gravity Energy boosts...
		for (let i = 0; i < GDs.boosts.list.length; i++) {
			let b = GDs.boosts.list[i]
			data[b] = GDs.boosts[b].eff(GDs.charge(data.ge, b))
		}
	},
	setupHTML() {
		var html = ""
		for (let i = 0; i < GDs.boosts.list.length; i++) {
			let b = GDs.boosts.list[i]
			html += '<tr>' +
				'<td>' + GDs.boosts[b].desc.replace('{{x}}', '<span class="gvBoost" id="gvTo_' + b + '">1.00</span>') + '</td>' +
				'<td style="text-align: right"><button id="gvCharge_' + b + '" onclick="GDs.chargeBoost(\'' + b + '\')">Charge</button></td>' +
				'</tr>'
		}
		document.getElementById("gvBoosts").innerHTML = html
	},
	updateDisplay() {
		document.getElementById("gdWatt").textContent = shorten(tmp.bl.speed)
		document.getElementById("gdMult").textContent = shorten(GDs.tmp.gdm)
		document.getElementById("gvRate").textContent = "+" + shortenMoney(Decimal.pow(GDs.tmp.gdm, GDs.gdExp(1)).times(GDs.save.gd1)) + "/s"

		document.getElementById("gdBoostDesc").textContent = "Gravity Dimension " + (GDs.save.gdBoosts >= 3 ? "Boost" : "Shift") + " (" + getFullExpansion(GDs.save.gdBoosts) + "): requires " + shortenDimensions(GDs.gdBoostReq()) + " Gravity Radiation"
		document.getElementById("gdBoost").className = GDs.save.gr.gte(GDs.gdBoostReq()) ? "storebtn gv" : "unavailablebtn"
		document.getElementById("gdBoost").textContent = GDs.save.gdBoosts >= 3 ? "Boost all Gravity Dimensions" : "Unlock a new Dimension"
		document.getElementById("rdTick").textContent = shortenDimensions(GDs.save.rdTick)
		document.getElementById("rdNextTick").textContent = shorten(GDs.rdNextTickAt())
		for (var d = 1; d <= 4; d++) {
			if (GDs.save.gdBoosts + 1 >= d) {
				document.getElementById("gd" + d).textContent = DISPLAY_NAMES[d] + " Gravity Dimension ^" + GDs.gdExp(d).toFixed(2)
				document.getElementById("gd" + d + "Amount").textContent = shortenDimensions(GDs.save["gd" + d])
			}
			document.getElementById("rd" + d + "Amount").textContent = shortenDimensions(GDs.save["rd" + d])
		}

		document.getElementById("gv").textContent = shortenMoney(GDs.save.gv)
		document.getElementById("gr").textContent = shortenMoney(GDs.save.gr)
		document.getElementById("gvPow").textContent = GDs.tmp.gp.toFixed(2)
		document.getElementById("gvPowScaling").textContent = (GDs.tmp.gpr == 0 ? "" : GDs.tmp.gpr == 1 ? "Radioactive " : "Radioactive^" + getFullExpansion(GDs.tmp.gpr) + " ") + "Power"
		document.getElementById("gvEne").textContent = GDs.tmp.ge.toFixed(2)
		document.getElementById("gvEneMult").textContent = GDs.tmp.gem.toFixed(2)

		document.getElementById("gvNoPow").style.display = GDs.tmp.gp == 0 ? "" : "none"
		if (GDs.tmp.gp == 0) document.getElementById("gvPowStart").textContent = shortenMoney(Decimal.pow(10, Math.pow(GDs.save.gr.add(10).log10(), 2/3)))

		document.getElementById("gvRadio").style.display = GDs.tmp.gpr >= 1 ? "" : "none"
		if (GDs.tmp.gpr >= 1) {
			document.getElementById("gvRadioExp").textContent = GDs.tmp.gpr >= 2 ? "^" + getFullExpansion(GDs.tmp.gpr) : ""
			document.getElementById("gvRadioPow").textContent = getFullExpansion(Math.floor(GDs.radioactivity(GDs.tmp.gpr)))
		}

		for (let i = 0; i < GDs.boosts.list.length; i++) {
			let b = GDs.boosts.list[i]
			document.getElementById("gvTo_" + b).textContent = GDs.tmp[b].toFixed(2)
		}
		document.getElementById("gvCharge").textContent = (GDs.tmp.gc * 100 - 100).toFixed(2) + "%"
		//document.getElementById("gvSupercharge").textContent = (GDs.tmp.gsc * 100 - 100).toFixed(2) + "%"
	},
	teleport() {
		showDimTab("gdims")
		showTab("dimensions")
	},
	can() {
		return player.totalmoney.log10() >= 1e18 && player.ghostify.hb.higgs >= 40
	},
	reqText() {
		return shortenCosts(Decimal.pow(10, 1e18)) + " antimatter and " + getFullExpansion(40) + " Higgs Bosons"
	},
	unl() {
		if (GDs.unlocked()) return
		if (!GDs.can()) return

		GDs.save.unl = true
		$.notify("Congratulations! You have unlocked Gravity Dimensions!", "success")
		giveAchievement("The Gravitational Well")
		updateBosonUnlockDisplay()
		GDs.unlDisplay()
	},
	unlDisplay() {
		let unl = GDs.unlocked()
		document.getElementById("gdtabbtn").style.display = unl ? "" : "none"
		document.getElementById("gvBlCell").style.display = unl ? "" : "none"
		updateNeutrinoUpgradeUnlocks(16, 18)

		if (unl) GDs.dimDisplay()
	},
	unlocked() {
		return GDs.save && GDs.save.unl
	},
	gdTick(diff) {
		for (var d = Math.min(GDs.save.gdBoosts + 1, 4); d >= 1; d--) {
			let add = Decimal.pow(GDs.tmp.gdm, GDs.gdExp(d)).times(GDs.save["gd" + d])
			if (d == 1) GDs.save.gv = GDs.save.gv.add(add.times(diff))
			else GDs.save["gd" + (d - 1)] = GDs.save["gd" + (d - 1)].add(add.times(diff / 10))
		}
	},
	gdExp(dim) {
		return (GDs.save.gdBoosts - dim + 1) / Math.sqrt(dim) + 1
	},
	gdBoost(x) {
		if (!GDs.save.gr.gte(GDs.gdBoostReq())) return
		GDs.save.gdBoosts++
		if (GDs.save.gdBoosts < 4) GDs.unlDisplay()
	},
	gdBoostReq(x) {
		if (x === undefined) x = GDs.save.gdBoosts
		return Decimal.pow(10, (Math.pow(x * 2, 2) + 5) * GDs.rdExp() * 2)
	},
	rdNextTickAt() {
		return GDs.save.rdTick.add(1).pow(1 / GDs.rdExp()).times(30)
	},
	rdTargetTick() {
		return Decimal.div(tmp.bl.speed, 30).pow(GDs.rdExp()).floor()
	},
	gainRDTicks() {
		let target = GDs.rdTargetTick()
		if (GDs.save.rdTick.gte(target)) return
		GDs.rdTick(target.sub(GDs.save.rdTick))
		GDs.save.rdTick = target
	},
	rdTick(diff) {
		for (var d = 4; d >= 1; d--) {
			if (d == 1) GDs.save.gr = GDs.save.gr.add(GDs.save["rd" + d].times(diff))
			else GDs.save["rd" + (d - 1)] = GDs.save["rd" + (d - 1)].add(GDs.save["rd" + d].div(10).times(diff))
		}
	},
	rdExp() {
		return GDs.save.gc ? GDs.boosts[GDs.save.gc].rdExp : 0.5
	},
	dimDisplay() {
		for (var d = 1; d <= 4; d++) document.getElementById("gd" + d + "Row").style.visibility = GDs.save.gdBoosts + 1 >= d ? "" : "hidden"
	},
	dimReset() {
		let data = GDs.save
		if (!GDs.unlocked()) return

		data.gv = new Decimal(0)
		data.gr = new Decimal(0)
		data.rdTick = new Decimal(0)
		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = new Decimal(1)
			data["rd" + d] = new Decimal(1)
		}
	},
	isRadioactiveActive(layer) {
		return GDs.tmp.gpr >= layer
	},
	radioactivity(layer) {
		if (!GDs.isRadioactiveActive(layer)) return
		return (GDs.tmp.gp - layer * 10) * Math.pow(GDs.save.gr.max(1).log10(), 2)
	},
	energyMult() {
		let x = 1
		if (isEnchantUsed(15)) x = tmp.bEn[15]
		if (isQCRewardActive(9)) x += tmp.qcRewards[9].ge || 0
		return x
	},
	charge(ge, id) {
		if (GDs.save.gc == id) ge *= GDs.tmp.gc
		ge *= GDs.tmp.gsc
		return ge
	},
	chargeMult() {
		let x = 3
		return x
	},
	superchargeMult() {
		return 1
	},
	chargeBoost(id) {
		if (GDs.save.gc == id) return
		if (!confirm("You will charge up a boost, but this requires a Higgs reset and a reset to all Gravity / Radiation Dimensions. Be warned: You will let Radiation goes up more. Are you sure?")) return
		this.save.gdBoosts = 0
		bosonicLabReset()
		document.getElementById("gv" + (GDs.save.gc ? "Charge_" + GDs.save.gc : "Uncharge")).className = "storebtn gv"
		document.getElementById("gvCharge_" + id).className = "chosenbtn"
		GDs.unlDisplay()
		GDs.save.gc = id
	},
	unchargeBoost() {
		if (!GDs.save.gc) return
		if (!confirm("This discharges all your boosts, but this will reset everything that charging resets. Are you sure?")) return
		this.save.gdBoosts = 0
		bosonicLabReset()
		document.getElementById("gvCharge_" + GDs.save.gc).className = "storebtn gv"
		document.getElementById("gvUncharge").className = "chosenbtn"
		GDs.unlDisplay()
		delete GDs.save.gc
	},
	chargeDisplay() {
		let c = GDs.save.gc
		for (let i = 0; i < GDs.boosts.list.length; i++) {
			let b = GDs.boosts.list[i]
			document.getElementById("gvCharge_" + b).className = c == b ? "chosenbtn" : "storebtn gv"
		}
		document.getElementById("gvUncharge").className = !c ? "chosenbtn" : "storebtn gv"
	},
	boosts: {
		list: ["rep", "nf", "tod", "bl"],
		rep: {
			desc: "x{{x}} OoMs to replicate interval increase",
			eff(x) {
				return Math.pow(x + 1, .5)
			},
			rdExp: 1.5
		},
		nf: {
			desc: "^{{x}} to Nanospeed",
			eff(x) {
				return x + 1
			},
			rdExp: 0.75
		},
		tod: {
			desc: "^{{x}} to Branch speed",
			eff(x) {
				return Math.pow(x / 2 + 1, tmp.newNGP3E ? .5 : 1 / 3)
			},
			rdExp: 0.5
		},
		bl: {
			desc: "^{{x}} to Bosonic Watts and Overdrive Speed",
			eff(x) {
				return Math.pow(x / 2 + 1, tmp.newNGP3E ? .85 : .75)
			},
			rdExp: 1
		},
	},
	reset(unl) {
		if (!unl && document.getElementById("gdims").style.display != "none") showDimTab("antimatterdimensions")
		player.ghostify.gv = GDs.setup()
		GDs.save.unl = unl
		GDs.unlDisplay()
	}
}