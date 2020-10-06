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

		pl.save = data
		return data
	},
	compile() {
		let data = player.pl
		pl.save = data

		if (!data.last10) data.last10 = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
		for (var r=0;r<10;r++) data.last10[r][1] = new Decimal(data.last10[r][1])

		if (!data.df) data.df = {
			amt: 1,
			bestMatter: 0
		}
		data.df.amt = new Decimal(data.df.amt)
		data.df.bestMatter = new Decimal(data.df.bestMatter)

		pl.updateTmp()
		pl.updateDisplay()
	},
	updateTmp() {
		let data = {}
		pl.tmp = data

		let plTier = pl.save.layer
		let dfEff = pl.save.df.amt.log10()
		data.bl = dfEff + 1
		data.mf = Math.sqrt(dfEff * plTier + 1)
		data.gph = Math.pow(2, 1 / (dfEff * Math.sqrt(plTier) / 5 + 1))
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
		if (!pl.can()) return
		if (pl.save.conf && !confirm(pl.conf)) return
		if (!pl.did()) for (let x = 0; x < pl.warnings.length; x++) if (!confirm(pl.warnings[x])) return

		ph.onPrestige("planck")
		pl.onReset()
	},
	exit() {
		if (!pl.save.on) return
		if (!confirm(pl.exitConf)) return
		pl.save.on = false
		bosonicLabReset()
		pl.updateDisplay()
		ph.updateDisplay()
	},
	onReset() {
		if (pl.save.on) pl.save.layer++
		else pl.save.on = true

		player.dilation.bestTPOverGhostifies = new Decimal(0)
		player.meta.bestOverQuantums = new Decimal(0)
		player.meta.bestOverGhostifies = new Decimal(0)
		player.ghostify.times = 0
		player.ghostify.best = 9999999999
		player.ghostify.last10 = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
		player.ghostify.ghostParticles = new Decimal(player.achievements.includes("ng3p115") ? 1e25 : 0)
		player.ghostify.neutrinos = getBrandNewNeutrinoData()
		player.ghostify.multPower = 1
		player.ghostify.ghostlyPhotons.enpowerments = 3
		tmp.bl.ticks = new Decimal(0)
		tmp.bl.enchants = {}
		player.ghostify.hb.higgs = 1
		GDs.save.gdBoosts = 0
		GDs.save.extraGDBs = 0

		tmp.bEn = {}

		bosonicLabReset()

		pl.save.best = Math.min(pl.save.best, pl.save.time)
		pl.save.time = 0
		pl.save.times++

		updateNeutrinoBoosts()
		updateNeutrinoUpgradeUnlocks(5, 12)
		updateGPHUnlocks()
		updateBLUnlocks()
		updateBosonUnlockDisplay()
		GDs.updateDisplay()
		pl.updateDisplay()

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
	updateDisplay() {
		if (!ph.did("planck")) return
		document.getElementById("plExit").className = "gluonupgrade " + (pl.on() ? "ghostifybtn" : "unavailablebtn")
		document.getElementById("plTier").textContent = getFullExpansion(pl.save.layer)
		document.getElementById("plTierReq").textContent = shortenMoney(pl.tierReq())

		document.getElementById("decayedFoam").textContent = shortenDimensions(pl.save.df.amt)
		document.getElementById("decayedFoam2").textContent = shortenDimensions(pl.save.df.amt)

		document.getElementById("dfToBl").textContent = pl.tmp.bl.toFixed(2)
		document.getElementById("dfToMf").textContent = pl.tmp.mf.toFixed(2)
		document.getElementById("dfToGph").textContent = pl.tmp.gph.toFixed(2)
	},
	updateDisplayOnTick() {
	},
	tierReq() {
		return Decimal.pow(10, Math.sqrt(pl.save.layer) * 1e18)
	},
	canTier() {
		return pl.on() && player.money.gt(pl.tierReq())
	},
	tier() {
		if (!pl.canTier()) return
		if (!confirm("You will be rewarded with extremely powerful boosts, but you will make the Planck layer harder. Are you sure?")) return
		pl.onReset()
	},
	annihilate() {
		if (!confirm("Are you sure?")) return
		pl.save.df.amt = new Decimal(1)
		pl.save.df.bestMatter = new Decimal(0)
		bosonicLabReset()
		pl.updateDisplay()
	}
}