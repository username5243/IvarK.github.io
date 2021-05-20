// v2.9
function quantum(auto, force, qc, isPC, bigRip, quick) {
	if (tmp.ngp3 && tmp.qu.bigRip.active) force = true
	if (!(isQuantumReached()||force)||implosionCheck) return

	var headstart = tmp.mod.newGamePlusVersion >= 1 && !tmp.ngp3
	var mode = ""
	var data
	if (qc) {
		if (!QCs.done(1) || player.options.challConf || tmp.mod.quantumConf) {
			if (!confirm("This performs a forced Quantum reset, but you will be brought into a real challenge. Are you sure you want to take this challenge down?")) return
		}
		mode = "qc"
		data = [qc]
	}
	if (tmp.mod.quantumConf && !(auto || force)) if (!confirm(player.masterystudies ? "Quantum will reset everything Eternity resets, and including all Eternity Content. You will gain a quark and unlock various upgrades." + (inNGM(2) ? " WARNING! THIS EXITS NG-- MODE DUE TO BALANCING REASONS!" : ""):"WARNING! Quantum wasn't fully implemented in NG++, so if you go Quantum now, you will gain quarks, but they'll have no use. Everything up to and including Eternity features will be reset.")) return
	if (!ph.did("quantum")) if (!confirm("Are you sure you want to do this? You will lose everything you have!")) return

	var qcData = []
	var QCType = 0

	var implode = !auto && !force && !ph.did("ghostify") && (tmp.qu.best >= 100 || !tmp.quUnl)
	if (implode) {
		implosionCheck = 1
		dev.implode()
		setTimeout(function(){
			quantumReset(force, auto, data, mode, bigRip, true)
		}, 1000)
		setTimeout(function(){
			implosionCheck = 0
		}, 2000)
	} else quantumReset(force, auto, data, mode, bigRip)

	updateTemp()
}

function getQuantumReq() {
	if (QCs.inAny()) return QCs.getGoalMA()

	let exp = 1
	if (tmp.ngp3) {
		exp = 1.2
		if (enB.active("pos", 3)) exp /= enB.tmp.pos3
	}
	return Decimal.pow(Number.MAX_VALUE, exp)
}

function isQuantumReached() {
	return ph.can("quantum")
}

function getQuarkGain(){
	return quarkGain()
}

function getQKGain(){
	return quarkGain()
}

function getQCtotalTime(){
	return 1 / 0 //Rework coming soon
}

function getQCtoQKEffect(){
	var time = getQCtotalTime()
	var ret = 1 + 192 * 3600 * 10 / time
	if (ret > 999) ret = 333 * Math.log10(ret + 1)
	return ret
}

function getQKAchBonusLog() {
	let log = 0
	if (hasAch("ng3p33")) log += Math.log10(getQCtoQKEffect())
	if (hasAch("ng3p53")) log += player.quantum.bigRip.spaceShards.plus(1).log10()
	if (hasAch("ng3p65")) log += getTotalRadioactiveDecays()
	if (hasAch("ng3p85")) log += Math.pow(player.ghostify.ghostlyPhotons.enpowerments, 2)
	if (hasAch("ng3p93")) log += Math.log10(500)
	return log
}

function getQuantumReqSource() {
	return tmp.ngp3 ? player.meta.bestAntimatter : player.meta.antimatter
}

function quarkGain() {
	if (QCs.inAny()) return new Decimal(0)
	if (!ph.did("quantum")) return new Decimal(1)

	let ma = getQuantumReqSource().max(1)
	let maReq = getQuantumReq()

	if (!tmp.ngp3) return Decimal.pow(10, ma.log(10) / Math.log10(Number.MAX_VALUE) - 1).floor()

	let log = Math.max(ma.log10() / maReq.log10() - 1, 0) / 2
	let logBoostExp = 4
	log = Math.pow(log + 1, logBoostExp) - 1

	log += getQKAchBonusLog()

	return Decimal.pow(10, log).floor()
}

function toggleQuantumConf() {
	tmp.mod.quantumConf = !tmp.mod.quantumConf
	getEl("quantumConfirmBtn").textContent = "Quantum confirmation: " + (tmp.mod.quantumConf ? "ON" : "OFF")
}

var averageQk = new Decimal(0)
var bestQk
function updateLastTenQuantums() {
	if (!player.meta) return
	var listed = 0
	var tempTime = new Decimal(0)
	var tempQK = new Decimal(0)
	for (var i = 0; i < 10; i++) {
		if (tmp.qu.last10[i][1].gt(0)) {
			var qkpm = tmp.qu.last10[i][1].dividedBy(tmp.qu.last10[i][0] / 600)
			var tempstring = "(" + shorten(qkpm) + " QK/min)"
			if (qkpm<1) tempstring = "(" + shorten(qkpm * 60) + " QK/hour)"
			var msg = "The quantum " + (i == 0 ? '1 quantum' : (i + 1) + ' quantums') + " ago took " + timeDisplayShort(tmp.qu.last10[i][0], false, 3)
			if (tmp.qu.last10[i][2]) {
				if (typeof(tmp.qu.last10[i][2]) == "number") " in Quantum Challenge " + tmp.qu.last10[i][2]
				else msg += " in Paired Challenge " + tmp.qu.last10[i][2][0] + " (QC" + tmp.qu.last10[i][2][1][0] + "+" + tmp.qu.last10[i][2][1][1] + ")"
			}
			msg += " and gave " + shortenDimensions(tmp.qu.last10[i][1]) +" QK. "+ tempstring
			getEl("quantumrun"+(i+1)).textContent = msg
			tempTime = tempTime.plus(tmp.qu.last10[i][0])
			tempQK = tempQK.plus(tmp.qu.last10[i][1])
			bestQk = tmp.qu.last10[i][1].max(bestQk)
			listed++
		} else getEl("quantumrun" + (i + 1)).textContent = ""
	}
	if (listed > 1) {
		tempTime = tempTime.dividedBy(listed)
		tempQK = tempQK.dividedBy(listed)
		var qkpm = tempQK.dividedBy(tempTime / 600)
		var tempstring = "(" + shorten(qkpm) + " QK/min)"
		averageQk = tempQK
		if (qkpm < 1) tempstring = "(" + shorten(qkpm * 60) + " QK/hour"
		getEl("averageQuantumRun").textContent = "Average time of the last " + listed + " Quantums: "+ timeDisplayShort(tempTime, false, 3) + " | Average QK gain: " + shortenDimensions(tempQK) + " QK. " + tempstring
	} else getEl("averageQuantumRun").textContent = ""
}

//v2.9014
function doQuantumProgress() {
	var quantumReq = getQuantumReq()
	var id = 1
	if (ph.did("quantum") && tmp.ngp3) {
		if (tmp.qu.bigRip.active) {
			var gg = getGHPGain()
			if (player.meta.antimatter.lt(quantumReq)) id = 1
			else if (!tmp.qu.breakEternity.unlocked) id = 4
			else if (!ph.did("ghostify") || player.money.lt(QCs.getGoalMA(undefined, true)) || Decimal.lt(gg, 2)) id = 5
			else if (player.ghostify.neutrinos.boosts > 8 && hasNU(12) && !player.ghostify.ghostlyPhotons.unl) id = 7
			else id = 6
		} else if (!QCs.inAny()) {
			var gqk = quarkGain()
			if (player.meta.antimatter.gte(quantumReq) && Decimal.gt(gqk, 1)) id = 3
		} else if (player.money.lt(Decimal.pow(10, QCs.getGoalMA())) || player.meta.antimatter.gte(quantumReq)) id = 2
	}
	var className = id > 4 ? "ghostifyProgress" : "quantumProgress"
	if (getEl("progressbar").className != className) getEl("progressbar").className = className
	if (id == 1) {
		var percentage = Math.min(player.meta.antimatter.max(1).log10() / quantumReq.log10() * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip', (player.masterystudies ? "Meta-antimatter p" : "P") + 'ercentage to quantum')
	} else if (id == 2) {
		var percentage = Math.min(player.money.max(1).log10() / QCs.getGoalMA() * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip','Percentage to Quantum Challenge goal')
	} else if (id == 3) {
		var gqkLog = gqk.log2()
		var goal = Math.pow(2, Math.ceil(Math.log10(gqkLog) / Math.log10(2)))
		if (!tmp.qu.reachedInfQK) goal = Math.min(goal, 1024)
		var percentage = Math.min(gqkLog / goal * 100, 100).toFixed(2) + "%"
		if (goal > 512 && !tmp.qu.reachedInfQK) percentage = Math.min(tmp.qu.quarks.add(gqk).log2() / goal * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		if (goal > 512 && !tmp.qu.reachedInfQK) getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to new QoL features (" + shorten(Number.MAX_VALUE) + " QK)")
		else getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to " + shortenDimensions(Decimal.pow(2, goal)) + " QK gain")
	} else if (id == 4) {
		var percentage = Math.min(player.eternityPoints.max(1).log10() / 12.15, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip','Eternity Points percentage to Break Eternity')
	} else if (id == 5) {
		var percentage = Math.min(tmp.qu.bigRip.bestThisRun.max(1).log10() / QCs.getGoalMA(undefined, true) * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip','Percentage to Ghostify')
	} else if (id == 6) {
		var ggLog = gg.log2()
		var goal = Math.pow(2, Math.ceil(Math.log10(ggLog) / Math.log10(2)))
		var percentage = Math.min(ggLog / goal * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to " + shortenDimensions(Decimal.pow(2, goal)) + " GHP gain")
	} else if (id == 7) {
		var percentage = Math.min(tmp.qu.bigRip.bestThisRun.max(1).log10() / 6000e4, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to Ghostly Photons")
	}
}

//v2.90142
function quantumReset(force, auto, data, mode, bigRip, implode = false) {
	var headstart = tmp.mod.newGamePlusVersion > 0 && !tmp.ngp3
	if (implode && qMs.tmp.amt < 1) {
		showTab("dimensions")
		showDimTab("antimatterdimensions")
		showChallengesTab("challenges")
		showInfTab("preinf")
		showEternityTab("timestudies", true)
	}
	if (!ph.did("quantum")) {
		exitNGMM()
		ph.onPrestige("quantum")
		ph.updateDisplay()
		if (tmp.ngp3) {
			getEl("bestAntimatterType").textContent = "Your best meta-antimatter for this quantum"
			getEl("quarksAnimBtn").style.display="inline-block"
		}
	}
	if (isEmptiness) {
		showTab("dimensions")
		isEmptiness = false
		ph.updateDisplay()
	}
	getEl("quantumbtn").style.display = "none"
	getEl("bigripbtn").style.display = "none"
	getEl("ghostifybtn").style.display = "none"
	updateBankedEter()

	// check if forced quantum
	// otherwise, give rewards
	if (force) {
		if (bigRip && hasAch("ng3p73")) player.infinitiedBank = nA(player.infinitiedBank, gainBankedInf())
		else bankedEterGain = 0
	} else {
		for (var i = tmp.qu.last10.length - 1; i > 0; i--) {
			tmp.qu.last10[i] = tmp.qu.last10[i - 1]
		}
		var qkGain = quarkGain()
		var array = [tmp.qu.time, qkGain]
		tmp.qu.last10[0] = array
		if (tmp.qu.best > tmp.qu.time) tmp.qu.best = tmp.qu.time
		tmp.qu.times++

		if (player.meta.bestAntimatter.lte(Number.MAX_VALUE)) giveAchievement("We are not going squared.")
		if (player.dilation.rebuyables[1] + player.dilation.rebuyables[2] + player.dilation.rebuyables[3] + player.dilation.rebuyables[4] < 1 && player.dilation.upgrades.length < 1) giveAchievement("Never make paradoxes!")
		if (tmp.qu.times >= 1e4) giveAchievement("Prestige No-lifer")

		if (hasAch("ng3p73")) player.infinitiedBank = nA(player.infinitiedBank, gainBankedInf())
	} //bounds the else statement to if (force)
	var oheHeadstart = bigRip ? tmp.bruActive[2] : tmp.ngp3
	var keepABnICs = oheHeadstart || bigRip || hasAch("ng3p51")
	var oldTime = tmp.qu.time
	tmp.qu.time = 0
	updateQuarkDisplay()

	// ng-2 display
	getEl("galaxyPoints2").innerHTML = "You have <span class='GPAmount'>0</span> Galaxy points."

	// ng+3
	if (tmp.ngp3) {
		var aea = {
			dilMode: player.eternityBuyer.dilMode,
			tpUpgraded: player.eternityBuyer.tpUpgraded,
			slowStop: player.eternityBuyer.slowStop,
			slowStopped: player.eternityBuyer.slowStopped,
			ifAD: player.eternityBuyer.ifAD,
			presets: player.eternityBuyer.presets
		}
		if (!tmp.qu.gluons.rg) {
			tmp.qu.gluons = {
				rg: new Decimal(0),
				gb: new Decimal(0),
				br: new Decimal(0)
			}
		}
		updateQuantumWorth()

		// big rip tracking
		if (bigRip && !tmp.bruActive[12]) {
			tmp.qu.bigRip.storedTS = {
				tt: player.timestudy.theorem,
				studies: player.timestudy.studies,
				boughtA: Decimal.div(player.timestudy.amcost, "1e20000").log("1e20000"),
				boughtI: player.timestudy.ipcost.log("1e100"),
				boughtE: Math.round(player.timestudy.epcost.log(2))
			}
			if (player.eternityChallUnlocked >= 12) tmp.qu.bigRip.storedTS.tt += masteryStudies.costs.ec[player.eternityChallUnlocked]
			else tmp.qu.bigRip.storedTS.tt += ([0, 30, 35, 40, 70, 130, 85, 115, 115, 415, 550, 1, 1])[player.eternityChallUnlocked]
			for (var s = 0; s < player.masterystudies.length; s++) if (player.masterystudies[s].indexOf("t") == 0) tmp.qu.bigRip.storedTS.studies.push(parseInt(player.masterystudies[s].split("t")[1]))
		}
		if (bigRip != tmp.qu.bigRip.active) switchAB()
		if (!bigRip && tmp.qu.bigRip.active) if (player.galaxies == 9 && player.replicanti.galaxies == 9 && player.timeDimension4.amount.round().eq(9)) giveAchievement("We can really afford 9.")
	} else tmp.qu.gluons = 0;

	if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
	if (hasAch("r104")) player.infinityPoints = new Decimal(2e25);
	else player.infinityPoints = new Decimal(0);

	// Quantum Challenges
	console.log(mode, data)
	var isQC = mode == "qc"
	if (!force) {
		let qcData = QCs.save.in
		if (qcData.length == 1) {
			let qc = qcData2[0]
			QCs.save.comps = Math.max(QCs.save.comps, qc)
			QCs.save.best[qc] = Math.max(QCs.save.best[qc] || 1/0, tmp.qu.best)
		}
	}
	QCs.save.in = isQC ? data : []

	QCs.updateTmp()
	QCs.updateDisp()

	if (QCs.in(1)) {
		player.respec = false
		player.respecMastery = true
		respecTimeStudies()

		player.timestudy.theorem = 0
	}

	// more big rip stuff
	if (tmp.ngp3) {
		if (!bigRip && tmp.qu.bigRip.active && force) {
			tmp.qu.bigRip.spaceShards = tmp.qu.bigRip.spaceShards.add(getSpaceShardsGain())
			if (player.ghostify.milestones < 8) tmp.qu.bigRip.spaceShards = tmp.qu.bigRip.spaceShards.round()
			if (player.matter.gt("1e5000")) giveAchievement("Really?")
		}
	}
	var oldMoney = player.money
	var dilTimes = player.dilation.times
	var bigRipChanged = tmp.ngp3 && bigRip != player.quantum.bigRip.active
	var turnSomeOn = !bigRip || player.quantum.bigRip.upgrades.includes(1)
	qMs.update()

	doQuantumResetStuff(bigRip, isQC, QCs.save.in)
	// ghostify achievement reward - "Kee-hee-hee!"
	if (ph.did("ghostify") && bigRip) {
		player.timeDimension8 = {
			cost: timeDimCost(8, 1),
			amount: new Decimal(1),
			power: new Decimal(1),
			bought: 1
		}
	}
		
	player.money = onQuantumAM()
	doInitInfMultStuff()
	if (inNGM(2) && !keepABnICs) player.autobuyers[12] = 13
	if (player.tickspeedBoosts !== undefined && !keepABnICs) player.autobuyers[13] = 14
	player.challenges = challengesCompletedOnEternity(bigRip)
	if (bigRip && player.ghostify.milestones > 9 && tmp.mod.ngudpV) for (var u = 7; u < 10; u++) player.eternityUpgrades.push(u)

	player.dilation.totalTachyonParticles = player.dilation.tachyonParticles
	if (tmp.ngp3) {
		player.dilation.times = 0
		if (!force) {
			gainQKOnQuantum(qkGain)

			if (tmp.qu.autoOptions.assignQK) assignAll(true)
			if (ph.did("ghostify")) player.ghostify.neutrinos.generationGain = player.ghostify.neutrinos.generationGain % 3 + 1
			if (isAutoGhostActive(4) && player.ghostify.automatorGhosts[4].mode != "t") rotateAutoUnstable()
		} //bounds if (!force)

		ph.updateActive()

		if ((!isQC && player.ghostify.milestones < 6) || bigRip != tmp.qu.bigRip.active) tmp.qu.replicants.amount = new Decimal(0)
		replicantsResetOnQuantum(isQC)
		nanofieldResetOnQuantum()
		player.eternityBuyer.tpUpgraded = false
		player.eternityBuyer.slowStopped = false
		if (tmp.qu.bigRip.active != bigRip) {
			if (bigRip) {
				for (var u = 0; u < tmp.qu.bigRip.upgrades.length; u++) tweakBigRip(tmp.qu.bigRip.upgrades[u])
				if (tmp.qu.bigRip.times < 1) getEl("bigRipConfirmBtn").style.display = "inline-block"
				tmp.qu.bigRip.times++
				tmp.qu.bigRip.bestThisRun = player.money
				giveAchievement("To the new dimension!")
				if (tmp.qu.breakEternity.break) tmp.qu.breakEternity.did = true
			} else {
				if (!tmp.qu.bigRip.upgrades.includes(1) && oheHeadstart) {
					player.infmultbuyer = true
					for (var d=0;d<8;d++) player.infDimBuyers[d] = true
				}
				if (qMs.tmp.amt >= 12) unstoreTT()
			}
			if (ph.did("ghostify")) player.ghostify.neutrinos.generationGain = player.ghostify.neutrinos.generationGain % 3 + 1
			tmp.qu.bigRip.active = bigRip
		}
		player.eternityBuyer.statBeforeDilation = 0
		if ((player.autoEterMode=="replicanti"||player.autoEterMode=="peak")&&qMs.tmp.amt<18) {
			player.autoEterMode="amount"
			updateAutoEterMode()
		}
		if (!bigRip || tmp.bruActive[12]) player.dilation.upgrades.push(10)
		else tmp.qu.wasted = bigRip && tmp.qu.bigRip.storedTS === undefined
		if (bigRip ? tmp.bruActive[12] : qMs.tmp.amt >= 14) {
			for (let i = (player.exdilation != undefined ? 1 : 3); i < 7; i++) if (i != 2 || !tmp.mod.ngudpV) player.dilation.upgrades.push((i > 2 ? "ngpp" : "ngud") + i)
			if (tmp.mod.nguspV) {
				for (var i = 1; i < 3; i++) player.dilation.upgrades.push("ngusp" + i)
				for (var i = 4; i < 23; i++) if (player.dilation.upgrades.includes(getDilUpgId(i))) player.dilation.autoUpgrades.push(i)
				updateExdilation()
			}
		}
		tmp.qu.notrelative = true
		updateMasteryStudyCosts()
		updateMasteryStudyButtons()
		delete tmp.qu.autoECN
	} // bounds if tmp.ngp3
	if (qMs.tmp.amt < 1 && !bigRip) {
		getEl("infmultbuyer").textContent = "Autobuy IP mult: OFF"
		getEl("togglecrunchmode").textContent = "Auto crunch mode: amount"
		getEl("limittext").textContent = "Amount of IP to wait until reset:"
		getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: " + shortenDimensions(player.epmult) + "x<p>Cost: " + shortenDimensions(player.epmultCost) + " EP"
	}
	if (!oheHeadstart) {
		player.autobuyers[9].bulk = Math.ceil(player.autobuyers[9].bulk)
		getEl("bulkDimboost").value = player.autobuyers[9].bulk
	}

	// last few updates
	setInitialResetPower()
	resetUP()
	if (oheHeadstart) player.replicanti.amount = new Decimal(1)
	player.replicanti.galaxies = 0
	updateRespecButtons()
	if (hasAch("r36")) player.tickspeed = player.tickspeed.times(0.98);
	if (hasAch("r45")) player.tickspeed = player.tickspeed.times(0.98);
	if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
	updateAutobuyers()
	if (hasAch("r85")) player.infMult = player.infMult.times(4);
	if (hasAch("r93")) player.infMult = player.infMult.times(4);
	if (hasAch("r104")) player.infinityPoints = new Decimal(2e25);
	resetInfDimensions();
	updateChallenges();
	updateNCVisuals()
	updateChallengeTimes()
	updateLastTenRuns()
	updateLastTenEternities()
	updateLastTenQuantums()
	if (!hasAch("r133") && !bigRip) {
		var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
		for (var i = 0; i < infchalls.length; i++) infchalls[i].style.display = "none"
	}
	GPminpeak = new Decimal(0)
	IPminpeak = new Decimal(0)
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	QKminpeak = new Decimal(0)
	QKminpeakValue = new Decimal(0)
	updateAutobuyers()
	updateMilestones()
	resetTimeDimensions()
	if (oheHeadstart) {
		getEl("replicantiresettoggle").style.display = "inline-block"
		skipResets()
	} else {
		hideDimensions()
		if (tmp.ngp3) getEl("infmultbuyer").textContent="Max buy IP mult"
		else getEl("infmultbuyer").style.display = "none"
		hideMaxIDButton()
		getEl("replicantidiv").style.display="none"
		getEl("replicantiunlock").style.display="inline-block"
		getEl("replicantiresettoggle").style.display = "none"
		delete player.replicanti.galaxybuyer
	}
	var shortenedIP = shortenDimensions(player.infinityPoints)
	getEl("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">" + shortenedIP + "</span> Infinity points."
	getEl("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">" + shortenedIP + "</span> Infinity points."
	updateEternityUpgrades()
	getEl("totaltickgained").textContent = "You've gained "+player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tickspeed upgrades."
	hideDimensions()
	tmp.tickUpdate = true
	playerInfinityUpgradesOnEternity()
	getEl("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
	getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: 1x<p>Cost: 500 EP"
	updateTheoremButtons()
	updateTimeStudyButtons()
	updateDilationUpgradeCosts()
	drawStudyTree()
	handleDispAndTmpOnQuantum(bigRip)

	Marathon2 = 0;
	setInitialMoney()
	getEl("quantumConfirmBtn").style.display = "inline-block"
}

function handleDispAndTmpOnQuantum(bigRip, prestige) {
	if (!tmp.ngp3) return
	if (!bigRip) bigRip = inBigRip()

	let keepECs = bigRip ? tmp.bruActive[2] : qMs.tmp.amt >= 2
	if (!keepECs && getEl("eternitychallenges").style.display == "block") showChallengesTab("normalchallenges")

	let keepDil = bigRip ? tmp.bruActive[10] : player.dilation.studies.includes(1)
	if (!keepDil && getEl("dilation").style.display == "block") showEternityTab("timestudies", getEl("eternitystore").style.display=="block")

	let keepMDs = bigRip ? tmp.bruActive[12] : keepDil && qMs.tmp.amt >= 6
	if (!keepMDs && getEl("metadimensions").style.display == "block") showDimTab("antimatterdimensions")

	let keepMSs = bigRip || masteryStudies.unl()
	getEl("masterystudyunlock").style.display = keepMSs ? "" : "none"
	getEl("respecMastery").style.display = keepMSs ? "block" : "none"
	getEl("respecMastery2").style.display = keepMSs ? "block" : "none"
	if (keepMSs) drawMasteryTree()
	else {
		performedTS = false
		if (getEl("masterystudies").style.display == "block") showEternityTab("timestudies", getEl("eternitystore").style.display != "block")
	}

	let keepQuantum = tmp.quActive && qMs.tmp.amt >= 16
	if (tmp.quActive && !bigRip) {
		let keepPos = keepQuantum && player.masterystudies.includes("d7")
		let keepAnts = keepQuantum && player.masterystudies.includes("d10")
		let keepNf = keepQuantum && player.masterystudies.includes("d11")
		let keepToD = keepQuantum && player.masterystudies.includes("d12")

		getEl("positronstabbtn").style.display = keepPos ? "" : "none"
		getEl("replicantstabbtn").style.display = keepAnts ? "" : "none"
		getEl("nanofieldtabbtn").style.display = keepNf ? "" : "none"
		getEl("todtabbtn").style.display = keepToD ? "" : "none"
	
		if (!keepPos && getEl("positrons").style.display == "block") showQuantumTab("uquarks")
		if (!keepAnts && getEl("replicants").style.display == "block") showQuantumTab("uquarks")
		if (!keepNf && getEl("nanofield").style.display == "block") showQuantumTab("uquarks")
		if (!keepToD && getEl("tod").style.display == "block") showQuantumTab("uquarks")
	}

	handleDispAndTmpOutOfQuantum(bigRip)
	handleQuantumDisplays(prestige)
}

function handleDispAndTmpOutOfQuantum(bigRip) {
	if (!bigRip) bigRip = inBigRip()

	let keepQuantum = tmp.quActive && qMs.tmp.amt >= 16
	let keepQCs = ph.shown("quantum") && keepQuantum && QCs.unl()
	let keepEDs = ph.shown("quantum") && keepQuantum && player.masterystudies.includes("d11")
	let keepBE = tmp.ngp3 && (bigRip || tmp.qu.breakEternity.unlocked || ph.did("ghostify"))

	if (!keepQCs && getEl("quantumchallenges").style.display == "block") showChallengesTab("normalchallenges")
	if (!keepEDs && getEl("emperordimensions").style.display == "block") showDimTab("antimatterdimensions")
	if (!keepBE && getEl("breakEternity").style.display == "block") showEternityTab("timestudies", getEl("eternitystore").style.display != "block")

	getEl("qctabbtn").style.display = keepQCs ? "" : "none"
	getEl("edtabbtn").style.display = keepEDs ? "" : "none"
	getEl("breakEternityTabbtn").style.display = keepBE? "" : "none"
}

function handleQuantumDisplays(prestige) {
	updateBankedEter()
	qMs.update()
	qMs.updateDisplay()
	if (!tmp.ngp3) return

	updateLastTenQuantums()
	updateAutoQuantumMode()

	updateAssortPercentage()
	updateColorCharge()
	updateGluonsTabOnUpdate()

	QCs.updateDisp()
	QCs.updateBest()

	updateReplicants(prestige ? "prestige" : "")

	updateTODStuff()

	updateBreakEternity()
}

function updateQuarkDisplay() {
	let msg = ""
	if (ph.did("quantum")) {
		msg += "You have <b class='QKAmount'>"+shortenDimensions(tmp.qu.quarks)+"</b> "	
		if (tmp.ngp3&&player.masterystudies.includes("d14")) msg += " aQK and <b class='SSAmount'>" + shortenDimensions(tmp.qu.bigRip.spaceShards) + "</b> Space Shard" + (tmp.qu.bigRip.spaceShards.round().eq(1) ? "" : "s")
		else msg += "anti-quark" + (tmp.qu.quarks.round().eq(1) ? "" : "s")
		msg += "."
	}
	getEl("quarks").innerHTML=msg
}

function metaReset2() {
	if (tmp.ngp3 && tmp.qu.bigRip.active) ghostify()
	else quantum()
}