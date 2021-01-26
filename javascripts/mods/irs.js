var setUnlocks
var powAdds = [null, 0, null, 0, 4, 4, 4]
function buyRepeatableInfinityUpgrade(id) {
	if (player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[id] + powAdds[id]))) return
	player.infinityPoints = player.infinityPoints.sub(Decimal.pow(10, player.infinityUpgradesRespecced[id] + powAdds[id]))
	player.infinityUpgradesRespecced[id]++
	if (id == 1) {
		player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), 10))
		updateTickSpeed()
	}
}

function getInfUpgPow(id) {
	var amt = player.infinityUpgradesRespecced[id]
	if (id == 4) return amt * 30
	if (id == 5) return 1 + amt * 0.17
	if (id == 6) return amt * 20
}

//v1.1
function updateSingularity() {
	if (player.infinityUpgradesRespecced == undefined) {
		getEl("singularitytabbtn").style.display = "none"
		return
	} else getEl("singularitytabbtn").style.display = ""
	if (player.singularity.unlocked) {
		getEl("singularityunlock").style.display = "none"
		getEl("singularitydiv").style.display = ""
		getEl("sacrificedIP").textContent = shortenDimensions(player.singularity.sacrificed)
		getEl("nextUpgrade").textContent = shortenCosts(Decimal.pow(10, player.singularity.upgraded * 2 + 32))
		getEl("sacrificeIP").className = gainedSingularityPower().eq(0) ? "unavailablebtn" : "storebtn"
		getEl("singularityPowerGain").textContent = shortenDimensions(gainedSingularityPower())
		getEl("singularityPower").textContent = shortenDimensions(player.singularity.singularityPower)
		getEl("darkMatterPerSecond").textContent = shortenDimensions(getDarkMatterPerSecond())
	} else {
		getEl("singularityunlock").style.display = ""
		getEl("singularitydiv").style.display = "none"
		getEl("singularityunlcost").textContent = shortenCosts(1e30)
		getEl("singularityunlock").className = player.infinityPoints.lt(1e30) ? "unavailablebtn" : "storebtn"
	}
}

function unlockSingularity() {
	if (player.infinityPoints.lt(1e30) || player.singularity.unlocked) return
	player.infinityPoints = player.infinityPoints.sub(1e30)
	player.singularity.unlocked = true
	updateSingularity()
	updateDimTechs()
}

function gainedSingularityPower() {
	return player.infinityPoints.div(1e30).pow(0.15).floor()
}

function sacrificeIP() {
	if (gainedSingularityPower().eq(0)) return
	player.singularity.singularityPower = player.singularity.singularityPower.add(gainedSingularityPower())
	player.singularity.sacrificed = player.singularity.sacrificed.add(player.infinityPoints)
	player.infinityPoints = new Decimal(0)
	player.singularity.upgraded += Math.floor(player.singularity.sacrificed.div(Decimal.pow(10, player.singularity.upgraded * 2 + 30)).log(100))
	updateSingularity()
}

function getDarkMatterPerSecond() {
	return player.singularity.singularityPower.times(Decimal.pow(2, player.singularity.upgraded))
}

function getDarkMatterMult() {
	return player.singularity.darkMatter.add(1).pow(4)
}

//v1.2
getEl("challenge16").onclick = function () {
	startChallenge("challenge16", Number.MAX_VALUE);
}

function updateDimTechs() {
	var shown = false
	if (player.infinityUpgradesRespecced != undefined) shown = player.singularity.unlocked
	if (!shown) {
		getEl("dimtechstabbtn").style.display = "none"
		return
	} else getEl("dimtechstabbtn").style.display = ""
	if (player.dimtechs.unlocked) {
		getEl("dimtechsunlock").style.display = "none"
		getEl("dimtechsdiv").style.display = ""
		var cost = getDimTechUpgradeCost()
		var canBuy = player.infinityPoints.gte(cost)
		for (var dim = 1; dim < 9; dim++) {
			getEl("dim" + dim + "techbtn").innerHTML = "Level " + getFullExpansion(player.dimtechs["dim" + dim + "Upgrades"]) + "<br>" + shortenDimensions(getDiscountMultiplier("dim" + dim)) + "x per discount upgrade" + "<br><br>Cost: " + shortenCosts(cost) + " IP"
			getEl("dim" + dim + "techbtn").className = canBuy ? "storebtn" : "unavailablebtn"
		}
		getEl("ticktechbtn").innerHTML = "Level " + getFullExpansion(player.dimtechs.tickUpgrades) + "<br>" + shortenDimensions(getDiscountMultiplier("tick")) + "x per discount upgrade" + "<br><br>Cost: " + shortenCosts(cost) + " IP"
		getEl("ticktechbtn").className = canBuy ? "storebtn" : "unavailablebtn"
		getEl("respecDimTechs").className = player.dimtechs.respec ? "respecbtn" : "storebtn"
	} else {
		getEl("dimtechsunlock").style.display = ""
		getEl("dimtechsdiv").style.display = "none"
		getEl("dimtechsunlcost").textContent = shortenCosts(1e95)
		getEl("dimtechsunlock").className = player.infinityPoints.lt(1e95) ? "unavailablebtn" : "storebtn"
	}
}

function unlockDimTechs() {
	if (player.infinityPoints.lt(1e95) || player.dimtechs.unlocked) return
	player.infinityPoints = player.infinityPoints.sub(1e95)
	player.dimtechs.unlocked = true
	updateDimTechs()
}

function getNextDiscounts() {
	return Decimal.pow(2, player.dimtechs.discounts * (player.dimtechs.discounts + 1) / 4).times(1e22)
}

function getDimTechUpgradeCost() {
	var total = 0
	for (var dim = 1; dim < 9; dim++) total += player.dimtechs["dim" + dim + "Upgrades"]
	total += player.dimtechs.tickUpgrades
	return Decimal.pow(5, total).times(1e95)
}

function buyDimTech(dim, tick) {
	if (tick) var name = "tick"
	else var name = "dim" + dim
	if (player.infinityPoints.lt(getDimTechUpgradeCost())) return
	player.infinityPoints = player.infinityPoints.sub(getDimTechUpgradeCost())
	var oldMultiplier = getDiscountMultiplier(name)
	player.dimtechs[name + "Upgrades"]++
	if (tick) player.tickSpeedCost = player.tickSpeedCost.div(Decimal.pow(getDiscountMultiplier(name).div(oldMultiplier), player.dimtechs.discounts))
	else player[TIER_NAMES[dim] + "Cost"] = player[TIER_NAMES[dim] + "Cost"].div(Decimal.pow(getDiscountMultiplier(name).div(oldMultiplier), player.dimtechs.discounts))
	updateDimTechs()
}

function getDiscountMultiplier(id) {
	return Decimal.pow(1e38, Math.sqrt(player.dimtechs[id + "Upgrades"]))
}

function respecDimTechs() {
	player.dimtechs.respec = !player.dimtechs.respec
	getEl("respecDimTechs").className = player.dimtechs.respec ? "respecbtn" : "storebtn"
}
