function updateGPHUnlocks() {
	let unl = player.ghostify.ghostlyPhotons.unl
	document.getElementById("gphUnl").style.display = unl ? "none" : ""
	document.getElementById("gphDiv").style.display = unl ? "" : "none"
	document.getElementById("breakUpgR3").style.display = unl ? "" : "none"
	document.getElementById("bltabbtn").style.display = unl ? "" : "none"
	updateNeutrinoUpgradeUnlocks(13, 15)
	ls.updateOption("gph")
}

function getGPHProduction() {
	let ret = new Decimal(0)
	if (tmp.qu.bigRip.active) ret = player.dilation.dilatedTime.div("1e480")
	if (player.achievements.includes("ng3p92")) ret = ret.add(1)
	if (ret.gt(1)) ret = ret.pow(0.02)
	return ret.times(getFinalPhotonicFlow())
}

function getDMProduction() {
	let ret = new Decimal(0)
	if (!tmp.qu.bigRip.active) ret = player.dilation.dilatedTime.div("1e930")
	if (player.achievements.includes("ng3p92")) ret = ret.add(1)
	if (ret.gt(1)) ret = ret.pow(0.02)
	return ret.times(getFinalPhotonicFlow())
}

function getGHRProduction() {
	let log = player.ghostify.ghostlyPhotons.amount.sqrt().div(2).log10()
	if (player.ghostify.neutrinos.boosts >= 11) log += tmp.nb[11].log10()
	return Decimal.pow(10, log).times(getFinalPhotonicFlow())
}

function getGHRCap() {
	let log = player.ghostify.ghostlyPhotons.darkMatter.pow(0.4).times(1e3).log10()
	if (player.ghostify.neutrinos.boosts >= 11) log += tmp.nb[11].log10()
	return Decimal.pow(10, log)
}

function getLightThreshold(l) {
	return Decimal.pow(getLightThresholdIncrease(l), player.ghostify.ghostlyPhotons.lights[l]).times(tmp.lt[l])
}

function getLightThresholdIncrease(l) {
	let x = tmp.lti[l]
	if (isNanoEffectUsed("light_threshold_speed")) {
		let y = 1 / tmp.nf.effects.light_threshold_speed
		if (y < 1) x = Math.pow(x, y)
	}
	return x
}

function getPhotonicFlow() {
	let x = new Decimal(1)
	if (player.achievements.includes("ng3p81")) x = new Decimal(2)
	if (GDs.unlocked()) x = Decimal.pow(x, GDs.tmp.gph)
	return x
}

function getFinalPhotonicFlow() {
	return tmp.phF.times(ls.mult("gph"))
}

function updatePhotonsTab(){
	updateRaysPhotonsDisplay()
	updateLightThresholdStrengthDisplay()
	updateLightBoostDisplay()
	updateLEmpowermentPrimary()
	updateLEmpowermentBoosts()
	updatePhotonicFlowDisplay()
}

function updateRaysPhotonsDisplay(){
	let gphData = player.ghostify.ghostlyPhotons
	document.getElementById("dtGPH").textContent = shorten(player.dilation.dilatedTime)
	document.getElementById("gphProduction").textContent = shorten(tmp.qu.bigRip.active ? getGPHProduction() : getDMProduction())
	document.getElementById("gphProduction").className = (tmp.qu.bigRip.active ? "gph" : "dm") + "Amount"
	document.getElementById("gphProductionType").textContent = tmp.qu.bigRip.active ? "Ghostly Photons" : "Dark Matter"
	document.getElementById("gph").textContent = shortenMoney(gphData.amount)
	document.getElementById("dm").textContent = shortenMoney(gphData.darkMatter)
	document.getElementById("ghrProduction").textContent = shortenMoney(getGHRProduction())
	document.getElementById("ghrCap").textContent = shortenMoney(getGHRCap())
	document.getElementById("ghr").textContent = shortenMoney(gphData.ghostlyRays)
}

function updateLightBoostDisplay(){
	let gphData = player.ghostify.ghostlyPhotons
	document.getElementById("lightMax1").textContent = getFullExpansion(gphData.maxRed)
	document.getElementById("lightBoost1").textContent = tmp.le[0].toFixed(3)
	document.getElementById("lightBoost2").textContent = tmp.le[1].toFixed(2)
	document.getElementById("lightBoost3").textContent = getFullExpansion(Math.floor(tmp.le[2]))
	document.getElementById("lightBoost4").textContent = (tmp.le[3] * 100 - 100).toFixed(1)
	document.getElementById("lightBoost5").textContent = (tmp.le[4] * 100).toFixed(1) + (hasBosonicUpg(11) ? "+" + (tmp.blu[11] * 100).toFixed(1) : "")
	document.getElementById("lightBoost6").textContent = shorten(tmp.le[5])
	document.getElementById("lightBoost7").textContent = shorten(tmp.le[6])
}

function updateLightThresholdStrengthDisplay(){
	let gphData=player.ghostify.ghostlyPhotons
	for (let c = 0; c < 8; c++) {
		document.getElementById("light" + (c + 1)).textContent = getFullExpansion(gphData.lights[c])
		document.getElementById("lightThreshold" + (c + 1)).textContent = shorten(getLightThreshold(c))
		if (c > 0) document.getElementById("lightStrength" + c).textContent = shorten(tmp.ls[c-1])
	}
}

function updatePhotonicFlowDisplay() {
	let t = ''
	let speeds = [tmp.phF]
	let speedDescs = [""]
	if (ls.mult("gph") != 1) {
		speeds.push(ls.mult("gph"))
		speedDescs.push("'Light Speed' mod")
	}
	document.getElementById("gphSpeed").textContent = "Photonic Flow: " + factorizeDescs(speeds, speedDescs) + shorten(getFinalPhotonicFlow()) + "x speed to Ghostly Photons"
}

//Light Empowerments
function getLightEmpowermentReq(le) {
	if (le === undefined) le = player.ghostify.ghostlyPhotons.enpowerments
	let x = le * 2.4 + 1
	let scale = 0
	if (le >= 20) {
		x += Math.pow(le - 19, 2) / 3
		scale = 1
	}
	if (le >= 50) {
		x = Decimal.pow(1.2, le - 49).add(x - 1)
		scale = 2
	}
	if (hasBosonicUpg(55)) x = Decimal.div(x, tmp.blu[55])
	if (x + 0 !== x) x = x.toNumber()

	if (player.achievements.includes("ng3p95")) x -= 1
	if (isLEBoostUnlocked(11)) x -= tmp.leBonus[11]

	tmp.leReqScale = scale
	return Math.floor(x)
}

function updateLightEmpowermentReq() {
	tmp.leReq = getLightEmpowermentReq()
}

function lightEmpowerment(auto) {
	if (!(player.ghostify.ghostlyPhotons.lights[7] >= tmp.leReq)) return
	if (!auto && !player.achievements.includes("ng3p102") && !player.aarexModifications.leNoConf) {
		if (!player.achievements.includes("ng3p92")) if (!confirm("You will become a ghost, but Ghostly Photons will be reset. As a result, you will gain a Light Empowerment from this. Are you sure you want to proceed?")) return
		if (player.achievements.includes("ng3p92"))  if (!confirm("You will become a ghost, but Ghostly Photons will be reset. As a result, you will bulk buy the maximum number of Light Empowerments you can. Are you sure you want to proceed?")) return
		/*
		a) don't give a confirmation if it resets nothing
		b) say how many empowerments you can get (1/many)
		*/
	}
	if (!player.ghostify.ghostlyPhotons.enpowerments) document.getElementById("leConfirmBtn").style.display = "inline-block"

	if (player.achievements.includes("ng3p92")) maxLightEmpowerments()
	else player.ghostify.ghostlyPhotons.enpowerments++
	
	if (player.achievements.includes("ng3p102")) return
	ghostify(false, true)

	if (player.achievements.includes("ng3p91")) return
	player.ghostify.ghostlyPhotons.amount = new Decimal(0)
	player.ghostify.ghostlyPhotons.darkMatter = new Decimal(0)
	player.ghostify.ghostlyPhotons.ghostlyRays = new Decimal(0)
	player.ghostify.ghostlyPhotons.lights = [0,0,0,0,0,0,0,0]
}

function maxLightEmpowerments() {
	let uv = player.ghostify.ghostlyPhotons.lights[7]
	let le = player.ghostify.ghostlyPhotons.enpowerments
	let x = 1
	let y = 0
	while (uv >= getLightEmpowermentReq(le + x * 2 - 1)) x *= 2
	while (x >= 1) {
		if (uv >= getLightEmpowermentReq(le + x + y - 1)) y += x
		x /= 2
	}
	player.ghostify.ghostlyPhotons.enpowerments += y
}

function getLightEmpowermentBoost() {
	let r = player.ghostify.ghostlyPhotons.enpowerments
	if (hasBosonicUpg(13)) r *= tmp.blu[13]
	return r
}

let leBoosts = {
	max: 11,
	1: {
		req() {
			return true
		},
		leThreshold: 1,
		eff() {
			let le1exp = 0.75
			if (tmp.newNGP3E) {
				le1exp += 0.2
				if (player.ghostify.ghostlyPhotons.unl) le1exp += .15
				if (player.ghostify.wzb.unl) le1exp += .15
			}
			let le1mult = 500
			if (tmp.newNGP3E) le1mult *= 2
			let eff = Math.pow(Math.log10(tmp.effL[3] + 1), le1exp) * le1mult
			return {effect: eff}
		},
		effDesc(x) {
			return getFullExpansion(Math.floor(x.effect))
		}
	},
	2: {
		req() {
			return true
		},
		leThreshold: 2,
		eff() {
			return Math.log10(tmp.effL[4] * 10 + 1) / 4 + 1
		},
		effDesc(x) {
			return (x * 100 - 100).toFixed(1)
		}
	},
	3: {
		req() {
			return true
		},
		leThreshold: 3,
		eff() {
			return Math.pow(tmp.effL[0].normal + 1, 0.1) * 2 - 1
		},
		effDesc(x) {
			return x.toFixed(2)
		}
	},
	4: {
		req() {
			return hasBosonicUpg(32)
		},
		leThreshold: 10,
		eff() {
			return tmp.leBonus[4]
		}
	},
	5: {
		req() {
			return hasBosonicUpg(32)
		},
		leThreshold: 13,
		eff() {
			return {
				exp: 0.75 - 0.25 / Math.sqrt(tmp.leBoost / 200 + 1),
				mult: Math.pow(tmp.leBoost / 100 + 1, 1/3),
			}
		},
		effDesc(x) {
			return "(" + shorten(x.mult) + "x+1)^" + x.exp.toFixed(3)
		}
	},
	6: {
		req() {
			return hasBosonicUpg(32)
		},
		leThreshold: 16,
		eff() {
			let exp = Math.min(Math.pow(tmp.effL[2] + 1, 0.25) - 1, 600)
			return Math.pow(3, exp)
		},
		effDesc(x) {
			return shorten(x)
		}
	},
	7: {
		req() {
			return hasBosonicUpg(32)
		},
		leThreshold: 19,
		eff() {
			return Math.pow(tmp.effL[5] / 150 + 1, 0.25)
		},
		effDesc(x) {
			return (x * 100).toFixed(1)
		}
	},
	8: {
		req() {
			return hasBosonicUpg(32)
		},
		leThreshold: 22,
		eff() {
			return Math.pow(tmp.effL[6] / 500 + 1, 0.125)
		},
		effDesc(x) {
			return (x * 100).toFixed(1)
		}
	},
	9: {
		req() {
			return hasBosonicUpg(53)
		},
		leThreshold: 0,
		eff() {
			return Math.pow(tmp.effL[1] / 10 + 1, 1/3) - 1
		},
		effDesc(x) {
			return x.toFixed(2)
		}
	},
	10: {
		req() {
			return hasBosonicUpg(53)
		},
		leThreshold: 0,
		eff() {
			return Math.cbrt(tmp.leBoost) / 10 + 1
		},
		effDesc(x) {
			return (x * 100 - 100).toFixed(2)
		}
	},
	11: {
		req() {
			return hasBosonicUpg(53)
		},
		leThreshold: 0,
		eff() {
			return tmp.leBoost / 10
		},
		effDesc(x) {
			return x.toFixed(2)
		}
	}
}

function isLEBoostUnlocked(x) {
	let data = leBoosts

	if (!ph.did("ghostify")) return false
	if (!player.ghostify.ghostlyPhotons.unl) return false
	if (x > data.max) return false
	if (data[x].req && !data[x].req()) return false
	return player.ghostify.ghostlyPhotons.enpowerments >= data[x].leThreshold
}

function updateLEmpowermentPrimary(){
	let gphData = player.ghostify.ghostlyPhotons
	document.getElementById("lightEmpowerment").className = "gluonupgrade "+(gphData.lights[7] >= tmp.leReq ? "gph" : "unavailablebtn")
	document.getElementById("lightEmpowermentReq").textContent = getFullExpansion(tmp.leReq)
	document.getElementById("lightEmpowerments").textContent = getFullExpansion(gphData.enpowerments)
	document.getElementById("lightEmpowermentScaling").textContent = getGalaxyScaleName(tmp.leReqScale) + "Light Empowerments"
	document.getElementById("lightEmpowermentsEffect").textContent = shorten(tmp.leBoost)
}

function updateLEmpowermentBoosts(){
	let boosts = 0
	for (let e = 1; e <= leBoosts.max; e++) {
		let unlocked = isLEBoostUnlocked(e)
		if (unlocked) boosts++
		document.getElementById("le"+e).style.visibility = unlocked ? "visible" : "hidden"
		if (unlocked && leBoosts[e].effDesc) document.getElementById("leBoost" + e).textContent = leBoosts[e].effDesc(tmp.leBonus[e])
	}
	if (boosts >= 1) document.getElementById("leBoost1Total").textContent = getFullExpansion(Math.floor(tmp.leBonus[1].total))
}