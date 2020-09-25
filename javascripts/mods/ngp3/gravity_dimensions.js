let GDs = {
	setup() {
		let data = {
			unl: false,
			gv: 0,
			gr: 0,
			gsc: 0
		}
		let dim_data = {
			amt: 0,
			bought: 0
		}
		this.save = data

		for (var d = 1; d <= 4; d++) {
			data["gd" + d] = {...dim_data}
			data["rd" + d] = {...dim_data}
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
			data["gd" + d].amt = new Decimal(data["gd" + d].amt)
			data["rd" + d].amt = new Decimal(data["rd" + d].amt)
		}
	},
	updateTmp() {
		let data = {}
		this.tmp = data

		if (!this.unlocked()) return

		data.gdm = Decimal.max(tmp.bl.speed, 1).log10() + 1 //Determine the initial multiplier for Gravity Dimensions.
		data.gp = this.save.gv.max(1).log10() / Math.sqrt(this.save.gr.max(1).log10() + 1) // Determines Gravity Power, which...

		data.rep = data.gp + 1 // Boosts Replicate Interval.
		data.nf = data.gp + 1 // Boosts Nanospeed.
		data.tod = data.gp + 1 // Boosts Branch Speed.
		data.bl = data.gp + 1 // Boosts Bosonic Speed.
	},
	can() {
		return player.money.e >= 1e18 && player.ghostify.hb.higgs >= 20
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
		document.getElementById("gdtabbtn").style.display = this.unlocked() ? "" : "none"
	},
	unlocked() {
		return this.save && this.save.unl
	},
	blExpanded() {
		return this.unlocked() && this.save.gd1.bought > 0
	}
}