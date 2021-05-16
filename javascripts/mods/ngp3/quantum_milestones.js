//New: v3.0 / Old: v1.79
let qMs = {
	tmp: {},
	old_reqs: [null, 43200, 32400, 21600, 16200, 10800, 7200, 3600, 3200, 2800, 2400, 2000, 1600, 1200, 800, 400, 300, 240, 210, 180, 150, 120, 90, 60, 30, 20, 15, 10, 5],
	update() {
		let data = {}
		qMs.tmp = data

		if (!tmp.ngp3) return
		data.points = 0

		//Speedrun
		data.amt_sr = Math.floor(Math.max(Math.log10(86400 / tmp.qu.best) / Math.log10(2) * 2 + 1, 0))
		data.points += data.amt_sr

		//Relatistic
		data.amt_rl = Math.floor((player.dilation.totalTachyonParticles.max(1).log10() - 80) / 5 + 1)
		data.points += data.amt_rl

		//Energetic
		data.amt_en = Math.floor(Math.sqrt(tmp.qu.bestEnergy || 0) * 2)
		data.points += data.amt_en

		//Milestones
		data.amt = 0
		for (var i = 1; i <= qMs.max; i++) if (data.points >= qMs[i].req) data.amt++
	},
	updateDisplay() {
		for (var i = 1; i <= qMs.max; i++) {
			getEl("qMs_req_" + i).textContent = "Milestone Point #" + getFullExpansion(qMs[i].req)
			getEl("qMs_reward_" + i).className = qMs.tmp.amt < i ? "qMs_locked" :
				!this[i].disablable ? "qMs_reward" :
				"qMs_toggle_" + (!tmp.qu.disabledRewards[i] ? "on" : "off")
			getEl("qMs_reward_" + i).textContent = qMs[i].eff()
		}

		if (qMs.tmp.amt >= 26) getEl('rebuyupgmax').style.display = "none"
		if (qMs.tmp.amt >= 28) {
			var removeMaxAll = false
			for (var d = 1; d < 9; d++) {
				if (player.autoEterOptions["md" + d]) {
					if (d > 7) removeMaxAll = true
				} else break
			}
			getEl("metaMaxAllDiv").style.display = removeMaxAll ? "none" : ""
		}
	},
	updateDisplayOnTick() {
		getEl("qMs_sr_target").textContent = timeDisplay(tmp.qu.best)
		getEl("qMs_sr_points").textContent = getFullExpansion(qMs.tmp.amt_sr)

		getEl("qMs_rl_target").textContent = shortenDimensions(player.dilation.totalTachyonParticles)
		getEl("qMs_rl_points").textContent = getFullExpansion(qMs.tmp.amt_rl)

		getEl("qMs_en_target").textContent = shorten(tmp.qu.bestEnergy)
		getEl("qMs_en_points").textContent = getFullExpansion(qMs.tmp.amt_en)

		getEl("qMs_points").textContent = getFullExpansion(qMs.tmp.points)
	},
	isOn(id) {
		return qMs.tmp.amt >= id && !tmp.qu.disabledRewards[id]
	},
	toggle(id) {
		if (!this[id].disablable) return

		let on = !tmp.qu.disabledRewards[id]
		tmp.qu.disabledRewards[id] = on
		getEl("qMs_reward_" + id).className = "qMs_toggle_" + (!on ? "on" : "off")
	},

	max: 29,
	1: {
		req: 1,
		eff: () => "Start with all Eternity Challenges completed and EC completions no longer respec studies",
		effGot: () => "You now start with all Eternity Challenges completed and EC completions no longer respec studies."
	},
	2: {
		req: 2,
		eff: () => "Unlock the autobuyer for Time Theorems and start with Eternities based on Quantum Milestones",
		effGot: () => "You now can automatically buy Time Theorems and start with Eternities based on Quantum Milestones."
	},
	3: {
		req: 3,
		disablable: true,
		eff: () => "Keep all your Eternity Upgrades and Time Studies",
		effGot: () => "You now can keep all your Eternity Upgrades and Time Studies."
	},
	4: {
		req: 4,
		eff: () => "Unlock the 'X times eternitied' mode for auto-Eternity",
		effGot: () => "You have unlocked the 'X times eternitied' mode for auto-Eternity."
	},
	5: {
		req: 5,
		disablable: true,
		eff: () => "Start with Time Dilation unlocked & 1 TP and each time you buy '3x TP' upgrade, your TP amount is increased by 3x",
		effGot: () => "You now start with Time Dilation unlocked & 1 TP and each time you buy '3x TP' upgrade, your TP amount is increased by 3x."
	},
	6: {
		req: 6,
		eff: () => "Start with all 8 Time Dimensions",
		effGot: () => "You now start with all 8 Time Dimensions."
	},
	7: {
		req: 7,
		eff: () => "Keep all your dilation upgrades expect the repeatables",
		effGot: () => "You now can keep all your dilation upgrades expect the repeatables."
	},
	8: {
		req: 8,
		eff: () => "Keep all your dilation upgrades that boost TP gain",
		effGot: () => "You now can keep all your dilation upgrades that boost TP gain."
	},
	9: {
		req: 9,
		eff: () => "Start with Meta Dimensions unlocked",
		effGot: () => "You now start with Meta Dimensions unlocked."
	},
	10: {
		req: 10,
		eff: () => "Keep all your mastery studies",
		effGot: () => "You now can keep all your mastery studies."
	},
	11: {
		req: 11,
		eff: () => "Unlock the autobuyer for repeatable dilation upgrades",
		effGot: () => "You now can automatically buy repeatable dilation upgrades."
	},
	12: {
		req: 12,
		eff: () => "Reduce the interval of auto-dilation upgrades and MDs by 10% (repeats for each following milestone)",
		effGot: () => "The interval of auto-dilation upgrades and MDs is now reduced by 10%. (repeats for each following milestone)"
	},
	13: {
		req: 13,
		eff: () => "Reduce the interval of auto-slow MDs by 1 tick per milestone (repeats for each following milestone)",
		effGot: () => "The interval of auto-slow MDs is now reduced by 1 tick per milestone. (repeats for each following milestone)"
	},
	14: {
		req: 14,
		eff: () => "Unlock the autobuyer for meta-Dimension Boosts",
		effGot: () => "You now can automatically buy meta-Dimension Boosts."
	},
	15: {
		req: 16,
		eff: () => "Unlock an option for auto-Eternity that automatically dilates for each interval of Eternity runs",
		effGot: () => "You have unlocked an option for auto-Eternity that automatically dilates for each interval of Eternity runs."
	},
	16: {
		req: 18,
		eff: () => "Start with " + shortenCosts(1e30) + " meta-antimatter",
		effGot: () => "You now start with " + shortenCosts(1e30) + " meta-antimatter."
	},
	17: {
		req: 20,
		eff: () => "All Meta Dimensions are available for purchase on Quantum",
		effGot: () => "All Meta Dimensions are now available for purchase on Quantum."
	},
	18: {
		req: 22,
		eff: () => "Unlock the autobuyer for Quantum runs",
		effGot: () => "You can now automatically go Quantum."
	},
	19: {
		req: 24,
		eff: () => "Start with 4 Meta-Dimension Boosts and Meta-Dimension Boosts no longer reset Meta Dimensions.",
		effGot: () => "You now start with 4 Meta-Dimension Boosts and Meta-Dimension Boosts no longer reset Meta Dimensions anymore."
	},
	20: {
		req: 27,
		eff: () => "Gain banked infinities based on your post-crunch infinitied stat",
		effGot: () => "Gain banked infinities based on your post-crunch infinitied stat."
	},
	21: {
		req: 30,
		eff: () => "Each milestone greatly reduces the interval of auto-dilation upgrades and MDBs",
		effGot: () => "Each milestone now greatly reduces the interval of auto-dilation upgrades and MDBs."
	},
	22: {
		req: 35,
		eff: () => "'2 Million Infinities' effect actives at 1s instead of 5s",
		effGot: () => "'2 Million Infinities' effect now actives at 1s instead of 5s."
	},
	23: {
		req: 40,
		eff: () => "Immediately generate TP on dilation runs.",
		effGot: () => "You now can immediately generate TP on dilation runs."
	},
	24: {
		req: 50,
		eff: () => "Auto-dilation upgrades maximize all repeatable dilation upgrades",
		effGot: () => "Auto-dilation upgrades now can maximize all repeatable dilation upgrades."
	},
	25: {
		req: 75,
		eff: () => "You start Quantums with one dilation worth of TP at " + shorten(Number.MAX_VALUE) + " antimatter",
		effGot: () => ""
	},
	26: {
		req: 100,
		eff: () => "Unlock the autobuyer for Entangled Boosters",
		effGot: () => "You now can automatically get Entangled Boosters."
	},
	27: {
		req: 150,
		eff: () => "Unlock the autobuyer for Positronic Boosters",
		effGot: () => "You now can automatically get Positronic Boosters."
	},
	28: {
		req: 200,
		eff: () => "Able to maximize Meta-Dimension Boosts",
		effGot: () => "You now can maximize Meta-Dimension Boosts."
	},
	29: {
		req: 300,
		eff: () => "Able to purchase all time studies without blocking",
		effGot: () => "You now can buy every single time study."
	}
}