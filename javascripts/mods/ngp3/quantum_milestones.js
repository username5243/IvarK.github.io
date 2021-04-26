//New: v3.0 / Old: v1.79
let qMs = {
	tmp: {},
	old_reqs: [null, 43200, 32400, 21600, 16200, 10800, 7200, 3600, 3200, 2800, 2400, 2000, 1600, 1200, 800, 400, 300, 240, 210, 180, 150, 120, 90, 60, 30, 20, 15, 10, 5],
	update() {
		let data = {}
		qMs.tmp = data

		if (!tmp.ngp3) return
		data.points = 0

		//Speedrun Milestones (Old)
		data.amt_sr = 0
		if (player.ghostify.milestones >= 1) data.amt_sr = 28
		else {
			for (var i = 1; i <= 28; i++) {
				if (tmp.qu.best > qMs.old_reqs[i] * 10) break
				data.amt_sr++
			}
		}
		data.points += data.amt_sr

		//Energetic
		data.amt_en = Math.floor(Math.sqrt((tmp.qu.bestEnergy || 0) / 2))
		data.points += data.amt_en

		//Milestones
		data.amt = 0
		for (var i = 1; i <= qMs.max; i++) if (data.points >= qMs[i].req) data.amt++
	},
	updateDisplay() {
		for (var i = 1; i <= qMs.max; i++) {
			getEl("qMs_req_" + i).textContent = "Milestone Point #" + getFullExpansion(qMs[i].req)
			getEl("qMs_reward_" + i).className = "qMs_" + (qMs.tmp.amt >= i ? "reward" : "locked")
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

		getEl("qMs_en_target").textContent = shorten(tmp.qu.bestEnergy)
		getEl("qMs_en_points").textContent = getFullExpansion(qMs.tmp.amt_en)

		getEl("qMs_points").textContent = getFullExpansion(qMs.tmp.points)
	},
	isOn(id) {
		if (!tmp.ngp3) return false
		return qMs.tmp.amt >= id && !tmp.qu.disabledRewards[id]
	},
	toggle(id) {
		tmp.qu.disabledRewards[id] = !tmp.qu.disabledRewards[id]
		getEl("reward" + id + "disable").textContent = (id > 11 ? "10 seconds" : id > 4 ? "33.3 mins" : (id > 3 ? 4.5 : 6) + " hours") + " reward: " + (tmp.qu.disabledRewards[id] ? "OFF" : "ON")
	},

	max: 24,
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
		req: 15,
		eff: () => "Unlock an option for auto-Eternity that automatically dilates for each interval of Eternity runs",
		effGot: () => "You have unlocked an option for auto-Eternity that automatically dilates for each interval of Eternity runs."
	},
	16: {
		req: 16,
		eff: () => "Start with " + shortenCosts(1e30) + " meta-antimatter",
		effGot: () => "You now start with " + shortenCosts(1e30) + " meta-antimatter."
	},
	17: {
		req: 17,
		eff: () => "All Meta Dimensions are available for purchase on Quantum",
		effGot: () => "All Meta Dimensions are now available for purchase on Quantum."
	},
	18: {
		req: 18,
		eff: () => "Unlock the autobuyer for Quantum runs",
		effGot: () => "You can now automatically go Quantum."
	},
	19: {
		req: 20,
		eff: () => "Start with 4 Meta-Dimension Boosts",
		effGot: () => "You now start with 4 Meta-Dimension Boosts."
	},
	20: {
		req: 22,
		eff: () => "Gain banked infinities based on your post-crunch infinitied stat",
		effGot: () => "Gain banked infinities based on your post-crunch infinitied stat."
	},
	21: {
		req: 25,
		eff: () => "Each milestone greatly reduces the interval of auto-dilation upgrades and MDBs",
		effGot: () => "Each milestone now greatly reduces the interval of auto-dilation upgrades and MDBs."
	},
	22: {
		req: 28,
		eff: () => "'2 Million Infinities' effect actives at 1s instead of 5s",
		effGot: () => "'2 Million Infinities' effect now actives at 1s instead of 5s."
	},
	23: {
		req: 32,
		eff: () => "Immediately generate TP on dilation runs.",
		effGot: () => "You now can immediately generate TP on dilation runs."
	},
	24: {
		req: 36,
		eff: () => "Auto-dilation upgrades maximize all repeatable dilation upgrades",
		effGot: () => "Auto-dilation upgrades now can maximize all repeatable dilation upgrades."
	}
}