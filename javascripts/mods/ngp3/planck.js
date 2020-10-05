let pl = {
	setup() {
		let data = {
			time: player.timePlayed,
			times: 0,
			best: 9999999999,
			conf: true,
			on: false,
			layer: 1,
		}

		this.save = data
		return data
	},
	compile() {
		let data = player.pl
		this.save = data

		if (!data.last10) data.last10 = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
		for (var r=0;r<10;r++) data.last10[r][1] = new Decimal(data.last10[r][1])
	},
	updateTmp() {
		let data = {}
		this.tmp = data
	},
	can() {
		return GDs.unlocked() && ranking >= 250 && GDs.tmp.ge >= 505
	},
	reqText() {
		return "250.0 PC Ranking and 50.0 Gravity Energy"
	},
	on() {
		return ph.did("planck") && pl.save.on
	},
	reset() {
		if (!this.can()) return
		if (this.save.conf && !confirm(this.conf)) return
		if (!this.did()) for (let x = 0; x < this.warnings.length; x++) if (!confirm(this.warnings[x])) return

		ph.onPrestige("planck")
		this.onReset()
		giveAchievement("Quantum-Scale")
	},
	exit() {
		if (!this.save.on) return
		if (!confirm(this.exitConf)) return
		this.save.on = false
		bosonicLabReset()
		ph.updateDisplay()
	},
	onReset() {
		if (this.save.on) this.save.layer++
		else this.save.on = true

		player.dilation.bestTPOverGhostifies = new Decimal(0)
		player.meta.bestOverQuantums = new Decimal(0)
		player.meta.bestOverGhostifies = new Decimal(0)
		player.ghostify.times = 0
		player.ghostify.best = 9999999999
		player.ghostify.last10 = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
		player.ghostify.ghostParticles = new Decimal(0)
		player.ghostify.neutrinos = getBrandNewNeutrinoData()
		player.ghostify.multPower = 1
		player.ghostify.ghostlyPhotons.enpowerments = 0
		tmp.bl.ticks = new Decimal(0)
		tmp.bl.enchants = {}
		player.ghostify.hb.higgs = 0
		GDs.save.gdBoosts = 0
		GDs.save.extraGDBs = 0

		tmp.bEn = {}

		bosonicLabReset()

		pl.save.best = Math.min(pl.save.best, pl.save.time)
		pl.save.time = 0
		pl.save.times++

		updateNeutrinoBoosts()
		updateGPHUnlocks()
		updateBLUnlocks()
		updateBosonUnlockDisplay()
		GDs.updateDisplay()
		ph.updateDisplay()
	},
	conf: "You will reset everything except Brave Milestones, Automator Ghosts, and all Ghostify unlocks, for a big boost / twist to Ghostify. Be warned: Eternity and Quantum don't work in this reduced universe. Ghost scientists researched that there's a little bit of matter that grows itself. Are you ready, again?",
	exitConf: "You will bring the universe back to normal, but matter won't appear until you reduce it again. Are you sure?",
	warnings: [
		"Are you sure you want to do this? You will lose everything you have!",
		"ARE YOU REALLY SURE YOU WANT TO DO THAT? BE WARNED, YOU WILL TAKE A BIG CHALLENGE. THIS IS REALLY YOUR LAST CHANCE!"
	],
	did() {
		return player.achievements.includes("ng3p111")
	},
}