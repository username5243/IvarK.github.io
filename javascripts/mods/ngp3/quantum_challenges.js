let QCs = {
	setup() {
		QCs.save = {
			in: [],
			comps: 0,
			best: {}
		}
		return QCs.save
	},
	compile() {
		QCs.save = {}
		if (tmp.ngp3 && tmp.qu !== undefined) {
			QCs.save = tmp.qu.qc
			if (QCs.save === undefined) tmp.qu.qc = this.setup()
		}
		QCs.updateTmp()
	},
	data: {
		max: 8,
		1: {
			unl: () => true,
			desc: () => "There are only Meta Dimensions, but they also produce antimatter. Also, all meta-antimatter boosts are based on meta-antimatter effect. Finally, Mastery Studies are extremely cheaper.",
			goal: () => false,
			goalDisp: () => "(not balanced yet)",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "Replicantis, meta-antimatter, and dilated time have gradually stronger boosts to each other.",
			rewardEff(str) {
				return Math.sqrt(player.replicanti.amount.max(1).log10()) * player.dilation.dilatedTime.max(1).log10() * player.meta.bestAntimatter.max(1).log10()
			}
		},
		2: {
			unl: () => true,
			desc: () => "There is a product which divides Meta Dimensions based on Dimension Boosts and Galaxies. You can't also set the limit of the autobuyer of Dimension Boosts.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "The Positron conversion formula is better.",
			rewardEff(str) {
				return str
			}
		},
		3: {
			unl: () => true,
			desc: () => "Replicated Galaxies are replaced with Replicated Boosts.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "You can keep Replicated Boosts, but the requirements and limits are much higher.",
			rewardEff(str) {
				return str
			}
		},
		4: {
			unl: () => true,
			desc: () => "Positronic Boosters are replaced with another set of boosts, but mastering doesn't work.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "Quantum Energy boosts the efficiency for non-activated mastered boosts.",
			rewardEff(str) {
				return str
			}
		},
		5: {
			unl: () => true,
			desc: () => "You must exclude one type of galaxy for non-dilation and dilation runs. Changing the exclusion requires a forced Eternity reset.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "Antimatter Galaxies share TS232 to other galaxies.",
			rewardEff(str) {
				return str
			}
		},
		6: {
			unl: () => true,
			desc: () => "Replicantis divide Dimensions instead, but each Replicated Galaxy divides the amount instead.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "25% of extra Replicated Galaxies contribute to the Positrons formula before Quantum Energy multiplier is cancelled.",
			rewardEff(str) {
				return str
			}
		},
		7: {
			unl: () => true,
			desc: () => "You can gain Tachyon Particles up to 5 dilation runs. Mastery Studies are reset.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "The 4th repeatable dilation upgrade uses a weaker cost scaling.",
			rewardEff(str) {
				return str
			}
		},
		8: {
			unl: () => true,
			desc: () => "QC5, but you can't change the exclusion.",
			goal: () => true,
			goalDisp: () => "???",
			goalMA: new Decimal(1),
			rewardDesc: (x) => "You gain more Tachyonic Galaxies.",
			rewardEff(str) {
				return str
			}
		},
	},
	tmp: {},

	updateTmp() {
		let data = { unl: [], in: [], rewards: {} }
		QCs.tmp = data

		if (!QCs.unl()) return
		for (let x = 1; x <= QCs.data.max; x++) {
			if (QCs.data[x].unl()) {
				if (QCs.save.in.includes(x)) data.in.push(x)
				data.unl.push(x)
				if (!QCs.done(x)) break
			}
		}

		QCs.updateTmpOnTick()
	},
	updateTmpOnTick() {
		if (!QCs.unl()) return
		
		let data = QCs.tmp
		for (let x = 1; x <= QCs.data.max; x++) {
			if (data.unl.includes(x)) {
				data.rewards[x] = QCs.data[x].rewardEff(1)
			}
		}
	},

	unl() {
		return tmp.quActive && masteryStudies.has("d8") && QCs.save !== undefined
	},
	in(x) {
		return QCs.tmp.in.includes(x)
	},
	inAny() {
		return QCs.tmp.in.length >= 1
	},
	done(x) {
		return QCs.save.comps >= x
	},
	isRewardOn(x) {
		return QCs.unl() && QCs.done(x) && QCs.tmp.rewards
	},
	getGoal() {
		return QCs.in.length >= 2 ? true : QCs.data[QCs.tmp.in[0]].goal()
	},
	getGoalDisp() {
		return QCs.in.length >= 2 ? "" : " and " + QCs.data[QCs.tmp.in[0]].goalDisp()
	},
	getGoalMA() {
		return QCs.data[QCs.tmp.in[0]].goalMA
	},

	tp() {
		showTab("challenges")
		showChallengesTab("quantumchallenges")
	},
	start(x) {
		quantum(false, true, x)
	},

	setupDiv() {
		if (QCs.divInserted) return

		let html = ""
		for (let x = 1; x <= QCs.data.max; x++) html += (x % 2 == 1 ? "<tr>" : "") + QCs.divTemp(x) + ((x + 1) % 2 == 1 ? "</tr>" : "")
		getEl("qcs_div").innerHTML = html

		QCs.divInserted = true
	},
	divTemp: (x) =>
		'<td><div class="quantumchallengediv" id="qc_' + x + '_div">' +
		'<span id="qc_' + x + '_desc"></span><br><br>' +
		'<div class="outer"><button id="qc_' + x + '_btn" class="challengesbtn" onclick="QCs.start(' + x + ')">Start</button><br>' +
		'Goal: <span id="qc_' + x + '_goal"></span><br>' +
		'Reward: <span id="qc_' + x + '_reward"></span>' +
		'</div></div></td>',
	divInserted: false,

	updateDisp() {
		//Quantum Challenges
		let unl = QCs.divInserted && QCs.unl()
		if (!unl) return

		for (let qc = 1; qc <= QCs.data.max; qc++) {
			var cUnl = QCs.tmp.unl.includes(qc)

			getEl("qc_" + qc + "_div").style.display = cUnl ? "" : "none"
			if (cUnl) {
				getEl("qc_" + qc + "_desc").textContent = QCs.data[qc].desc()
				getEl("qc_" + qc + "_goal").textContent = shorten(QCs.data[qc].goalMA) + " meta-antimatter and " + QCs.data[qc].goalDisp()
				getEl("qc_" + qc + "_btn").textContent = QCs.in(qc) ? "Running" : QCs.done(qc) ? "Completed" : "Start"
				getEl("qc_" + qc + "_btn").className = QCs.in(qc) ? "onchallengebtn" : QCs.done(qc) ? "completedchallengesbtn" : "challengesbtn"
			}
		}

		//Paired Challenges
		/*
		assigned = []
		var assignedNums = {}
		getEl("pairedchallenges").style.display = player.masterystudies.includes("d9") ? "" : "none"
		getEl("respecPC").style.display = player.masterystudies.includes("d9") ? "" : "none"
		for (var pc = 1; pc <= 4; pc++) {
			var subChalls = tmp.qu.pairedChallenges.order[pc]
			if (subChalls) for (var sc = 0; sc < 2; sc++) {
				var subChall = subChalls[sc]
				if (subChall) {
					assigned.push(subChall)
					assignedNums[subChall] = pc
				}
			}
			if (player.masterystudies.includes("d9")) {
				var property = "pc" + pc
				var sc1 = tmp.qu.pairedChallenges.order[pc] ? tmp.qu.pairedChallenges.order[pc][0] : 0
				var sc2 = (sc1 ? tmp.qu.pairedChallenges.order[pc].length > 1 : false) ? tmp.qu.pairedChallenges.order[pc][1] : 0
				getEl(property+"desc").textContent = "Paired Challenge "+pc+": Both Quantum Challenge " + (sc1 ? sc1 : "?") + " and " + (sc2 ? sc2 : "?") + " are applied."
				getEl(property+"cost").textContent = "Cost: Still none. ;/"
				getEl(property+"goal").textContent = "Goal: " + (sc2 ? shortenCosts(Decimal.pow(10, QCs.getGoalMA(subChalls))) : "???") + " antimatter"
				getEl(property).textContent = pcFocus == pc ? "Cancel" : (tmp.qu.pairedChallenges.order[pc] ? tmp.qu.pairedChallenges.order[pc].length < 2 : true) ? "Assign" : tmp.qu.pairedChallenges.current == pc ? "Running" : tmp.qu.pairedChallenges.completed >= pc ? "Completed" : tmp.qu.pairedChallenges.completed + 1 < pc ? "Locked" : "Start"
				getEl(property).className = pcFocus == pc || (tmp.qu.pairedChallenges.order[pc] ? tmp.qu.pairedChallenges.order[pc].length < 2 : true) ? "challengesbtn" : tmp.qu.pairedChallenges.completed >= pc ? "completedchallengesbtn" : tmp.qu.pairedChallenges.completed + 1 <pc ? "lockedchallengesbtn" : tmp.qu.pairedChallenges.current == pc ? "onchallengebtn" : "challengesbtn"

				var sc1t = Math.min(sc1, sc2)
				var sc2t = Math.max(sc1, sc2)
				if (player.masterystudies.includes("d14")) {
					getEl(property + "br").style.display = ""
					getEl(property + "br").textContent = sc1t != 6 || sc2t != 8 ? "QC6 & 8" : tmp.qu.bigRip.active ? "Big Ripped" : tmp.qu.pairedChallenges.completed + 1 < pc ? "Locked" : "Big Rip"
					getEl(property + "br").className = sc1t != 6 || sc2t != 8 ? "lockedchallengesbtn" : tmp.qu.bigRip.active ? "onchallengebtn" : tmp.qu.pairedChallenges.completed + 1 < pc ? "lockedchallengesbtn" : "bigripbtn"
				} else getEl(property + "br").style.display = "none"
			}
		}
		*/

		//Big Rip
		getEl("bigrip").style.display = player.masterystudies.includes("d14") ? "" : "none"
		if (masteryStudies.has("d14")) {
			var max = getMaxBigRipUpgrades()
			getEl("spaceShards").textContent = shortenDimensions(tmp.qu.bigRip.spaceShards)
			for (var u = 18; u <= 20; u++) getEl("bigripupg" + u).parentElement.style.display = u > max ? "none" : ""
			for (var u = 1; u <= max; u++) {
				getEl("bigripupg" + u).className = tmp.qu.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
				getEl("bigripupg" + u + "cost").textContent = shortenDimensions(new Decimal(bigRipUpgCosts[u]))
			}
		}
	},
	updateDispOnTick() {
		if (!QCs.divInserted) return

		for (let qc = 1; qc <= QCs.data.max; qc++) {
			if (QCs.tmp.unl.includes(qc)) getEl("qc_" + qc + "_reward").textContent = QCs.data[qc].rewardDesc(QCs.tmp.rewards[qc])
		}
	},
	updateBest() {
		//Rework coming soon
	}
}