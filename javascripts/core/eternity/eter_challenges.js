//Eternity Challenges
function canUnlockEC(idx, cost, study, study2) {
	study2 = (study2 !== undefined) ? study2 : 0;
	if (player.eternityChallUnlocked !== 0) return false
	if (!player.timestudy.studies.includes(study) && (player.study2 == 0 || !player.timestudy.studies.includes(study2))) return false
	if (player.timestudy.theorem < cost) return false
	if (player.etercreq == idx && idx !== 11 && idx !== 12) return true

	var ec1Mult = player.aarexModifications.newGameExpVersion ? 1e3 : 2e4
	switch(idx) {
		case 1:
			if (getEternitied() >= (ECTimesCompleted("eterc1") ? ECTimesCompleted("eterc1") + 1 : 1) * ec1Mult) return true
			break;

		case 2:
			if (player.totalTickGained >= 1300 + (ECTimesCompleted("eterc2") * 150)) return true
			break;

		case 3:
			if (player.eightAmount.gte(17300 + (ECTimesCompleted("eterc3") * 1250))) return true
			break;

		case 4:
			if (1e8 + (ECTimesCompleted("eterc4") * 5e7) <= getInfinitied()) return true
			break;

		case 5:
			if (160 + (ECTimesCompleted("eterc5") * 14) <= player.galaxies) return true
			break;

		case 6:
			if (40 + (ECTimesCompleted("eterc6") * 5) <= player.replicanti.galaxies) return true
			break;

		case 7:
			if (player.money.gte(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))) return true
			break;

		case 8:
			if (player.infinityPoints.gte(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))) return true
			break;

		case 9:
			if (player.infinityPower.gte(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))) return true
			break;

		case 10:
			if (player.eternityPoints.gte(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))) return true
			break;

		case 11:
			if (player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72) && !player.timestudy.studies.includes(73)) return true
			break;

		case 12:
			if (player.timestudy.studies.includes(73) && !player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72)) return true
			break;
	}
	return false
}

function canUnlockECFromNum(n){
	if (n == 1) return canUnlockEC(1, 30, 171)
	if (n == 2) return canUnlockEC(2, 35, 171)
	if (n == 3) return canUnlockEC(3, 40, 171)
	if (n == 4) return canUnlockEC(4, 70, 143)
	if (n == 5) return canUnlockEC(5, 130, 42)
	if (n == 6) return canUnlockEC(6, 85, 121)
	if (n == 7) return canUnlockEC(7, 115, 111)
	if (n == 8) return canUnlockEC(8, 115, 123)
	if (n == 9) return canUnlockEC(9, 415, 151)
	if (n == 10) return canUnlockEC(10, 550, 181)
	if (n == 11) return canUnlockEC(11, 1, 231, 232)
	if (n == 12) return canUnlockEC(12, 1, 233, 234)
	return false
}

let ECCosts = [null, 
		30,  35,  40,
		70,  130, 85,
		115, 115, 415,
		550, 1,   1]

for (let ecnum = 1; ecnum <= 12; ecnum ++){
	document.getElementById("ec" + ecnum + "unl").onclick = function(){
		if (canUnlockECFromNum(ecnum)) {
			unlockEChall(ecnum)
			player.timestudy.theorem -= ECCosts[ecnum]
			drawStudyTree()
		}
	}
}

function unlockEChall(idx) {
	if (player.eternityChallUnlocked == 0) {
		player.eternityChallUnlocked = idx
		document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
		if (!justImported) showTab("challenges")
		if (!justImported) showChallengesTab("eternitychallenges")
		if (idx !== 13 && idx !== 14) {
			updateTimeStudyButtons(true)
			player.etercreq = idx
		}
		if (tmp.ngp3) delete tmp.qu.autoECN
	}
	updateEternityChallenges()
}

function updateECUnlockButtons() {
	for (let ecnum = 1; ecnum <= 12; ecnum ++){
		let s = "ec" + ecnum + "unl"
		if (canUnlockECFromNum(ecnum)) document.getElementById(s).className = "eternitychallengestudy"
		else document.getElementById(s).className = "eternitychallengestudylocked"
	}
	if (player.eternityChallUnlocked !== 0) document.getElementById("ec" + player.eternityChallUnlocked + "unl").className = "eternitychallengestudybought"
}

function resetEternityChallUnlocks() {
	let ec = player.eternityChallUnlocked
	if (!ec) return

	if (ec >= 13) player.timestudy.theorem += masteryStudies.costs.ec[ec]
	else player.timestudy.theorem += ([0, 30, 35, 40, 70, 130, 85, 115, 115, 415, 550, 1, 1])[ec]

	player.eternityChallUnlocked = 0
	updateEternityChallenges()
}

let ecExpData = {
	inits: {
		eterc1: 1800,
		eterc2: 975,
		eterc3: 600,
		eterc4: 2750,
		eterc5: 750,
		eterc6: 850,
		eterc7: 2000,
		eterc8: 1300,
		eterc9: 1750,
		eterc10: 3000,
		eterc11: 500,
		eterc12: 110000,
		eterc13: 38500000,
		eterc14: 1595000,
		eterc1_ngmm: 1800,
		eterc2_ngmm: 1125,
		eterc3_ngmm: 1025,
		eterc4_ngmm: 2575,
		eterc5_ngmm: 600,
		eterc6_ngmm: 850,
		eterc7_ngmm: 1450,
		eterc8_ngmm: 2100,
		eterc9_ngmm: 2250,
		eterc10_ngmm: 2205,
		eterc11_ngmm: 35000,
		eterc12_ngmm: 17000,
	},
	increases: {
		eterc1: 200,
		eterc2: 175,
		eterc3: 75,
		eterc4: 550,
		eterc5: 400,
		eterc6: 250,
		eterc7: 530,
		eterc8: 900,
		eterc9: 250,
		eterc10: 300,
		eterc11: 200,
		eterc12: 12000,
		eterc13: 1000000,
		eterc14: 800000,
		eterc1_ngmm: 400,
		eterc2_ngmm: 250,
		eterc3_ngmm: 100,
		eterc4_ngmm: 525,
		eterc5_ngmm: 300,
		eterc6_ngmm: 225,
		eterc8_ngmm: 500,
		eterc9_ngmm: 300,
		eterc10_ngmm: 175,
		eterc11_ngmm: 3250,
		eterc12_ngmm: 1500,
	}
}

function getECGoal(x) {
	let expInit = ecExpData.inits[x]
	let expIncrease = ecExpData.increases[x]
	let completions = ECTimesCompleted(x)
	if (player.galacticSacrifice != undefined) {
		expInit = ecExpData.inits[x + "_ngmm"] || expInit
		expIncrease = ecExpData.increases[x + "_ngmm"] || expIncrease
	}
	let exp = expInit + expIncrease * completions
	if (x == "ec13") exp += 600000 * Math.max(completions - 2, 0) * (completions - 3, 0)
	return Decimal.pow(10, exp)
}

function updateEternityChallenges() {
	tmp.ec=0
	var locked = true
	for (ec=1;ec<15;ec++) {
		var property = "eterc"+ec 
		var ecdata = player.eternityChalls[property]
		if (ecdata) {
			tmp.ec+=ecdata
			locked=false
		}
		document.getElementById(property+"div").style.display=ecdata?"inline-block":"none"
		document.getElementById(property).textContent=ecdata>4?"Completed":"Locked"
		document.getElementById(property).className=ecdata>4?"completedchallengesbtn":"lockedchallengesbtn"
	}
	if (player.eternityChallUnlocked>0) {
		var property="eterc"+player.eternityChallUnlocked
		var onchallenge=player.currentEternityChall==property
		locked=false
		document.getElementById(property+"div").style.display="inline-block"
		document.getElementById(property).textContent=onchallenge?"Running":"Start"
		document.getElementById(property).className=onchallenge?"onchallengebtn":"challengesbtn"
	}
	document.getElementById("eterctabbtn").parentElement.style.display = ph.shown("eternity") && !locked ? "" : "none"
	document.getElementById("autoEC").style.display = tmp.ngp3 && !ph.did("quantum") ? "inline-block" : "none"
	if (ph.did("quantum")&&tmp.ngp3) document.getElementById("autoEC").className=tmp.qu.autoEC?"timestudybought":"storebtn"
}

function startEternityChallenge(n) {
	if (player.currentEternityChall == "eterc"+n || parseInt(n) != player.eternityChallUnlocked) return
	if (player.options.challConf) if (!confirm("You will start over with just your time studies, eternity upgrades and achievements. You need to reach a set IP goal with special conditions.")) return
	if (ph.did("ghostify") && name == "eterc10") player.ghostify.under = false
	var oldStat = getEternitied()
	player.eternities = nA(player.eternities, gainEternitiedStat())
	updateBankedEter()
	if (player.tickspeedBoosts != undefined) player.tickspeedBoosts = 0
	if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
	else player.infinityPoints = new Decimal(0);
	
	doEternityResetStuff()

	player.eternityChallGoal =  getECGoal("eterc" + n)
	player.currentEternityChall =  "eterc" + n
	player.galacticSacrifice = resetGalacticSacrifice(true)
		
	if (player.galacticSacrifice && getEternitied() < 2) player.autobuyers[12] = 13
	if (player.tickspeedBoosts != undefined && getEternitied() < 2) player.autobuyers[13] = 14
	if (player.dilation.active) {
		player.dilation.active = false
		if (tmp.ngp3 && ph.did("quantum")) updateColorCharge()
	}
	if (player.replicanti.unl && speedrunMilestonesReached < 22) player.replicanti.amount = new Decimal(1)
	extraReplGalaxies = 0
	resetReplicantiUpgrades()
	player.tdBoosts = resetTDBoosts()
	resetPSac()
	resetTDsOnNGM4()
	reduceDimCosts()
	setInitialResetPower()
	if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
	if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
	var autobuyers = document.getElementsByClassName('autoBuyerDiv')
	if (getEternitied() < 2) {
		for (var i = 0; i < autobuyers.length; i++) autobuyers.item(i).style.display = "none"
		document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
		document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
		document.getElementById("buyerBtnInf").style.display = "inline-block"
		document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
		document.getElementById("buyerBtnSac").style.display = "inline-block"
	}
	updateAutobuyers()
	setInitialMoney()
	if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
	if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
	if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
	resetInfDimensions(true);
	updateChallenges();
	updateNCVisuals()
	updateLastTenRuns()
	updateLastTenEternities()
	if (!player.achievements.includes("r133")) {
		var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
		for (var i = 0; i < infchalls.length; i++) infchalls[i].style.display = "none"
	}
	GPminpeak = new Decimal(0)
	IPminpeak = new Decimal(0)
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	updateMilestones()
	resetTimeDimensions()
	if (getEternitied() < 20) player.autobuyers[9].bulk = 1
	if (getEternitied() < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
	if (getEternitied() < 50) {
		document.getElementById("replicantidiv").style.display="none"
		document.getElementById("replicantiunlock").style.display="inline-block"
	}
	if (getEternitied() > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
	document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	if (getEternitied() > 0 && oldStat < 1) {
		document.getElementById("infmultbuyer").style.display = "inline-block"
		document.getElementById("infmultbuyer").textContent = "Autobuy IP mult O" + (player.infMultBuyer?"N":"FF")
	}
	hideMaxIDButton()
	document.getElementById("eternitybtn").style.display = "none"
	updateEternityUpgrades()
	document.getElementById("totaltickgained").textContent = "You've gained "+player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tickspeed upgrades."
	hideDimensions()
	tmp.tickUpdate = true;
	playerInfinityUpgradesOnEternity()
	updateEternityChallenges()
	Marathon2 = 0
	resetUP()
	doAutoEterTick()
	if (tmp.ngp3 && player.dilation.upgrades.includes("ngpp3") && getEternitied() >= 1e9) player.dbPower = getDimensionBoostPower()
}

function isEC12Active() {
	return player.currentEternityChall == "eterc12" || player.pSac !== undefined
}

function getEC12Mult() {
	let r = 1e3
	let p14 = hasPU(14, true)
	if (p14) r /= puMults[14](p14)
	return r
}

function getEC12TimeLimit() {
	//In the multiple of 0.1 seconds
	let r = 10 - 2 * ECTimesCompleted("eterc12")
	if (tmp.ngex) r *= 3.75
	return Math.max(r, 1)
}

function ECTimesCompleted(name) {
	return (tmp.eterUnl && player.eternityChalls[name]) || 0
}

function getECReward(x) {
	let m2 = player.galacticSacrifice !== undefined
	let c=ECTimesCompleted("eterc" + x)
	if (x == 1) return Math.pow(Math.max(player.thisEternity * 10, 1), (0.3 + c * 0.05) * (m2 ? 5 : 1))
	if (x == 2) {
		let r = player.infinityPower.pow((m2 ? 4.5 : 1.5) / (700 - c * 100)).add(1)
		if (m2) r = Decimal.pow(player.infinityPower.add(10).log10(), 1000).times(r)
		else r = r.min(1e100)
		return r.max(1)
	}
	if (x == 3) return c * 0.8
	if (x == 4) return player.infinityPoints.max(1).pow((m2 ? .4 : 0.003) + c * (m2 ? .2 : 0.002)).min(m2 ? 1/0 : 1e200)
	if (x == 5) return c * 5
	if (x == 8) {
		let x = Math.log10(player.infinityPower.plus(1).log10() + 1)
		if (x > 0) x=Math.pow(x, (m2 ? 0.05 : 0.03) * c)
		return Math.max(x, 1)
	}
	if (x == 9) {
		let r=player.timeShards
		if (r.gt(0)) r = r.pow(c / (m2 ? 2 : 10))
		if (m2) return r.plus(1).min("1e10000")
		if (!player.aarexModifications.newGameExpVersion) return r.plus(1).min("1e400")
		if (r.lt("1e400")) return r.plus(1)
		let log = Math.sqrt(r.log10() * 400)
		return Decimal.pow(10, Math.min(50000, log))	
	}
	if (x == 10) return Decimal.pow(getInfinitied(), m2 ? 2 : .9).times(c * (m2 ? 0.02 : 0.000002)).add(1).pow(player.timestudy.studies.includes(31) ? 4 : 1)
	if (x == 12) return 1 - c * (m2 ? .06 : 0.008)
	if (x == 13) {
		var data={
			main:[0, 0.25, 0.5, 0.7, 0.85, 1],
			legacy:[0, 0.2, 0.4, 0.6, 0.8, 1]
		}
		var dataUsed = data.main
		return dataUsed[c]
	}
	if (x == 14) return getIC3EffFromFreeUpgs()
}