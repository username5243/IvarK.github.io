function getTDBoostReq() {
	let amount = player.tdBoosts > 2 || player.pSac != undefined ? 10 : 2
	let maxTier = inNC(4) || player.pSac != undefined ? 6 : 8
	let mult = inNC(4) || player.pSac != undefined ? 3 : 2
	return {amount: Math.ceil(amount + Math.max(player.tdBoosts + (player.pSac ? 0 : 1 - maxTier), 0) * mult), mult: mult, tier: Math.min(player.tdBoosts + 1, maxTier)}
}

function buyMaxTDB(){
	let r = getTDBoostReq()
	if (r.tier < 8) {
		tdBoost(1)
		return
	}
	let b = 0
	if (r.amount <= player.timeDimension8.bought) b = 1 + Math.floor((player.timeDimension8.bought - r.amount)/r.mult)
	if (!player.achievements.includes("r73")) b = Math.min(1, b)
	b = Math.max(0,b)
	tdBoost(b)
}

function tdBoost(bulk) {
	let req = getTDBoostReq()
	if (player["timeDimension" + req.tier].bought < req.amount) return
	if (cantReset()) return
	player.tdBoosts += bulk
	if (!player.achievements.includes("r36")) softReset(player.achievements.includes("r26") && player.resets >= player.tdBoosts ? 0 : -player.resets)
	player.tickBoughtThisInf = updateTBTIonGalaxy()
}

function resetTDBoosts() {
	if (player.aarexModifications.ngmX > 3) return player.achievements.includes("r27") && player.currentChallenge == "" ? 3 : 0
}

function resetTDsOnNGM4() {
	if (player.aarexModifications.ngmX >= 4) resetTimeDimensions()
}

//v2.1
document.getElementById("challenge16").onclick = function () {
	startNormalChallenge(16)
}

function autoTDBoostBoolean() {
	var req = getTDBoostReq()
	var amount = player["timeDimension" + req.tier].bought
	if (!player.autobuyers[14].isOn) return false
	if (player.autobuyers[14].ticks * 100 < player.autobuyers[14].interval) return false
	if (amount < req.amount) return false
	if (player.aarexModifications.ngmX > 3 && inNC(14)) return false
	if (player.autobuyers[14].overXGals <= player.galaxies) return true
	if (player.autobuyers[14].priority < req.amount) return false
	return true
}

//v2.11
function cantReset() {
	return player.aarexModifications.ngmX > 3 && inNC(14) && getTotalResets() > 9
}

document.getElementById("buyerBtnTDBoost").onclick = function () {
	buyAutobuyer(14)
}

function maxHighestTD() {
	player.aarexModifications.maxHighestTD=!player.aarexModifications.maxHighestTD
	document.getElementById("maxHighestTD").textContent = "Buy Max the highest tier of Time Dimensions: O"+(player.aarexModifications.maxHighestTD?"N":"FF")
}
