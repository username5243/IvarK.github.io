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
		pl.showTab('null')
		return data
	},
	compile() {
		delete pl.tmp

		let data = player.pl
		pl.save = data
		if (!data) return

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

		let tabsSave = player.aarexModifications.tabsSave
		pl.showTab((tabsSave.on && tabsSave.tabPl) || 'null')
	},
	updateTmp() {
		let data = {}
		pl.tmp = data

		let eff = pl.save.df.amt.log10() * Math.sqrt(pl.save.layer)

		data.buffNeutral = Math.log10(eff / 5 + 1) + 1
		data.buffNeutral2 = eff + 1
		data.nerfNeutral = 1.5 / (eff / 20 + 1) + 1
		data.nerfNeutral2 = eff + 1

		data.buffOmega = eff / data.nerfNeutral2
		data.buffMu = eff / data.nerfNeutral2 + 1
		data.nerfOmega = eff * data.buffNeutral2 + 1
		data.nerfMu = eff * data.buffNeutral2
	},
	can() {
		return GDs.unlocked() && ranking >= 250 && GDs.tmp.ge >= 50
	},
	reqText() {
		return "250.0 PC Ranking and 50.0 Gravity Energy"
	},
	on() {
		return tmp.ngpX >= 5 && pl.save.on
	},
	reset() {
		if (pl.on()) {
			pl.tier()
			return
		}

		if (!pl.can()) return
		if ((tmp.ngpX < 5 || pl.save.conf) && !confirm(pl.conf())) return
		if (!pl.did()) {
			for (let x = 0; x < pl.warnings.length; x++) if (!confirm(pl.warnings[x])) return
		}

		ph.onPrestige("planck")
		pl.onReset()
	},
	exit() {
		if (!pl.on()) return
		if (!confirm(pl.exitConf)) return
		pl.save.on = false
		bosonicLabReset()
		pl.updateDisplay()
		ph.updateDisplay()
	},
	onReset() {
		if (!pl.save) {
			convertToNGP5()
			if (player.exdilation !== undefined) exitNGUd()
			if (tmp.ngSg) ngSg.exit()
		}

		if (pl.on()) pl.save.layer++
		else pl.save.on = true

		player.dilation.bestTPOverGhostifies = new Decimal(0)
		player.meta.bestOverQuantums = new Decimal(0)
		player.meta.bestOverGhostifies = new Decimal(0)
		player.ghostify.times = 0
		player.ghostify.best = 9999999999
		player.ghostify.last10 = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
		player.ghostify.ghostParticles = new Decimal(player.achievements.includes("ng3p115") ? 1e25 : 0)
		player.ghostify.neutrinos = getBrandNewNeutrinoData()
		player.ghostify.neutrinos.boosts = 9
		player.ghostify.neutrinos.upgrades = player.achievements.includes("ng3p115") ? [6] : []
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
	conf() {
		let exit = []
		if (tmp.ngSg !== undefined) exit.push("NGSg")
		if (player.exdilation !== undefined) exit.push("NGUd")

		return "You will reset everything except Brave Milestones, Automator Ghosts, and all Ghostify unlocks, for a big boost / twist to Ghostify. Be warned: " + (exit.length ? wordizeList(exit) + " content won't work anymore after your first Planck! " : "") + "Eternity and Quantum don't work in this reduced universe. Ghost scientists researched that there's a little bit of matter that grows itself. Are you ready, again?"
	},
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
		document.getElementById("planck").style.display = ph.can("planck") ? "" : "none"
		document.getElementById("plMsg").textContent = pl.on() ? "Tier up the Planck Scale to " + getFullExpansion(pl.save.layer + 1) + " and supercharge!" : "See beyond the forces of Quantum... I want to go deeper into Planck scale."

		document.getElementById("plExit").className = "gluonupgrade " + (pl.on() ? "ghostifybtn" : "unavailablebtn")
		document.getElementById("plTier").textContent = getFullExpansion(pl.save.layer)
		document.getElementById("plTierReq").textContent = shortenMoney(pl.tierReq())

		document.getElementById("nulliFoam").textContent = shortenDimensions(pl.save.df.amt)

		document.getElementById("mfDecay").className = "gluonupgrade " + (pl.on() ? "planckbtn" : "unavailablebtn")
	},
	updateDisplayOnTick() {
		let tab = player.aarexModifications.tabsSave.tabPl
		if (tab == "null") {
			document.getElementById("plTierUp").className = "gluonupgrade " + (pl.canTier() ? "planckbtn" : "unavailablebtn")
			document.getElementById("dfGain").textContent = shorten(pl.decayGain())

			let types = ["Omega", "Mu", "Neutral", "Neutral2"]
			for (let x = 1; x <= 4; x++) {
				let type = types[x - 1]
				document.getElementById("dfBuff" + type).textContent = pl.tmp["buff" + type].toFixed(2)
				document.getElementById("dfNerf" + type).textContent = pl.tmp["nerf" + type].toFixed(2)
			}
		}
	},
	showTab(x) {
		//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
		let tabName = "pl_" + x
		let tabs = document.getElementsByClassName('pltab')
		let tab
		let oldTab

		for (var i = 0; i < tabs.length; i++) {
			tab = tabs[i]
			if (tab.style.display == 'block') oldTab = tab.id
			tab.style.display = tab.id == tabName ? 'block' : 'none'
		}
		if (!oldTab || oldTab != x) player.aarexModifications.tabsSave.tabPl = x
		closeToolTip()
	},
	radioactivityToMatter() {
		return GDs.radioactivity(1) + 1
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
	decayGain() {
		return player.matter.max(1).log10() / 100 + 1
	},
	decay() {
		if (!pl.on()) return
		pl.save.df.amt = pl.save.df.amt.times(pl.decayGain())
		bosonicLabReset()
		pl.updateDisplay()
	},
	annihilate() {
		if (!confirm("Are you sure?")) return
		pl.save.df.amt = new Decimal(1)
		pl.save.df.bestMatter = new Decimal(0)
		if (pl.on()) bosonicLabReset()
		pl.updateDisplay()
	}
}