//Quantum worth
var quantumWorth
function updateQuantumWorth(mode) {
	if (!tmp.ngp3) return
	if (player.ghostify.milestones<8) {
		if (mode != "notation") mode=undefined
	} else if (mode == "notation") return
	if (mode != "notation") {
		if (mode != "display") {
			quantumWorth = tmp.qu.quarks.add(tmp.qu.usedQuarks.r).add(tmp.qu.usedQuarks.g).add(tmp.qu.usedQuarks.b).add(tmp.qu.gluons.rg).add(tmp.qu.gluons.gb).add(tmp.qu.gluons.br).round()
		}
		if (player.ghostify.times) {
			var automaticCharge = Math.max(Math.log10(quantumWorth.add(1).log10() / 150) / Math.log10(2), 0) + Math.max(tmp.qu.bigRip.spaceShards.add(1).log10() / 20 - 0.5, 0)
			player.ghostify.automatorGhosts.power = Math.max(automaticCharge, player.ghostify.automatorGhosts.power)
			if (mode != "quick") {
				getEl("automaticCharge").textContent = automaticCharge.toFixed(2)
				getEl("automaticPower").textContent = player.ghostify.automatorGhosts.power.toFixed(2)
			}
			while (player.ghostify.automatorGhosts.ghosts<MAX_AUTO_GHOSTS&&player.ghostify.automatorGhosts.power>=autoGhostRequirements[player.ghostify.automatorGhosts.ghosts-3]) {
				player.ghostify.automatorGhosts.ghosts++
				getEl("autoGhost"+player.ghostify.automatorGhosts.ghosts).style.visibility="visible"
				if (player.ghostify.automatorGhosts.ghosts == 22) getEl("autoCS").style.display = ""
				if (player.ghostify.automatorGhosts.ghosts == MAX_AUTO_GHOSTS) getEl("nextAutomatorGhost").parentElement.style.display="none"
				else {
					getEl("automatorGhostsAmount").textContent=player.ghostify.automatorGhosts.ghosts
					getEl("nextAutomatorGhost").parentElement.style.display=""
					getEl("nextAutomatorGhost").textContent=autoGhostRequirements[player.ghostify.automatorGhosts.ghosts-3].toFixed(1)
				}
			}
		}
	}
	if (mode != "quick") for (var e = 1; e <= 2; e++) getEl("quantumWorth" + e).textContent = shortenDimensions(quantumWorth)
}

//Quark Assertment Machine
function getAssortPercentage() {
	return tmp.qu.assortPercentage ? tmp.qu.assortPercentage : 100
}

function getAssortAmount() {
	return tmp.qu.quarks.floor().min(tmp.qu.quarks).times(getAssortPercentage() / 100).round()
}

var assortDefaultPercentages = [10, 25, 50, 100]
function updateAssortPercentage() {
	let percentage = getAssortPercentage()
	getEl("assort_percentage").value = percentage
	for (var i = 0; i < assortDefaultPercentages.length; i++) {
		var percentage2 = assortDefaultPercentages[i]
		getEl("assort_percentage_" + percentage2).className = percentage2 == percentage ? "chosenbtn" : "storebtn"
	}
}

function changeAssortPercentage(x) {
	tmp.qu.assortPercentage = Math.max(Math.min(parseFloat(x || getEl("assort_percentage").value), 100), 0)
	updateAssortPercentage()
	updateQuarksTabOnUpdate()
}

function assignQuark(color) {
	var usedQuarks = getAssortAmount()
	if (usedQuarks.eq(0)) {
		$.notify("Make sure you are assigning at least one quark!")
		return
	}
	var mult = getQuarkAssignMult()
	tmp.qu.usedQuarks[color] = tmp.qu.usedQuarks[color].add(usedQuarks.times(mult)).round()
	tmp.qu.quarks = tmp.qu.quarks.sub(usedQuarks)
	getEl("quarks").innerHTML = "You have <b class='QKAmount'>0</b> quarks."
	if (!mult.eq(1)) updateQuantumWorth()
	updateColorCharge()
	if (player.ghostify.another > 0) player.ghostify.another--
}

function assignAll(auto) {
	var ratios = tmp.qu.assignAllRatios
	var sum = ratios.r+ratios.g+ratios.b
	var oldQuarks = getAssortAmount()
	var colors = ['r','g','b']
	var mult = getQuarkAssignMult()
	for (c = 0; c < 3; c++) {
		var toAssign = oldQuarks.times(ratios[colors[c]]/sum).round()
		if (toAssign.gt(0)) {
			tmp.qu.usedQuarks[colors[c]] = tmp.qu.usedQuarks[colors[c]].add(toAssign.times(mult)).round()
			if (player.ghostify.another > 0) player.ghostify.another--
		}
	}
	tmp.qu.quarks = tmp.qu.quarks.sub(oldQuarks).round()
	if (tmp.qu.autoOptions.assignQKRotate) {
		if (tmp.qu.autoOptions.assignQKRotate > 1) {
			tmp.qu.assignAllRatios = {
				r: tmp.qu.assignAllRatios.g,
				g: tmp.qu.assignAllRatios.b,
				b: tmp.qu.assignAllRatios.r
			}
		} else tmp.qu.assignAllRatios = {
			r: tmp.qu.assignAllRatios.b,
			g: tmp.qu.assignAllRatios.r,
			b: tmp.qu.assignAllRatios.g
		}
		var colors = ['r','g','b']
		for (c = 0; c < 3; c++) getEl("ratio_" + colors[c]).value = tmp.qu.assignAllRatios[colors[c]]
	}
	if (mult.gt(1)) updateQuantumWorth()
	updateColorCharge()
}

function getQuarkAssignMult() {
	let r = new Decimal(1)
	if (hasBosonicUpg(23)) r = r.times(tmp.blu[23])
	return r
}

function changeRatio(color) {
	var value = parseFloat(getEl("ratio_" + color).value)
	if (value < 0 || isNaN(value)) {
		getEl("ratio_" + color).value = tmp.qu.assignAllRatios[color]
		return
	}
	var sum = 0
	var colors = ['r','g','b']
	for (c = 0; c < 3; c++) sum += colors[c] == color ? value : tmp.qu.assignAllRatios[colors[c]]
	if (sum == 0 || sum == 1/0) {
		getEl("ratio_" + color).value = tmp.qu.assignAllRatios[color]
		return
	}
	tmp.qu.assignAllRatios[color] = value
}

function toggleAutoAssign() {
	tmp.qu.autoOptions.assignQK = !tmp.qu.autoOptions.assignQK
	getEl('autoAssign').textContent="Auto: O"+(tmp.qu.autoOptions.assignQK?"N":"FF")
	if (tmp.qu.autoOptions.assignQK && tmp.qu.quarks.gt(0)) assignAll(true)
}

function rotateAutoAssign() {
	tmp.qu.autoOptions.assignQKRotate=tmp.qu.autoOptions.assignQKRotate?(tmp.qu.autoOptions.assignQKRotate+1)%3:1
	getEl('autoAssignRotate').textContent="Rotation: "+(tmp.qu.autoOptions.assignQKRotate>1?"Left":tmp.qu.autoOptions.assignQKRotate?"Right":"None")
}

//Color Charge
colorCharge = {
	normal: {}
}
colorShorthands = {
	r: 'red',
	g: 'green',
	b: 'blue'
}

function updateColorCharge() {
	if (!tmp.ngp3) return
	var colors = ['r', 'g', 'b']
	var colorPowers = {}
	for (var i = 0; i < 3; i++) {
		var ret = Decimal.add(tmp.qu.usedQuarks[colors[i]], 1). log10()
		colorCharge[colors[i]] = player.ghostify.milestones >= 2 ? ret : 0
		colorPowers[colors[i]] = ret
	}

	var sorted = []
	for (var s = 0; s < 3; s++) {
		var search = ''
		for (var i = 0; i < 3; i++) if (!sorted.includes(colors[i])&&(search==''||tmp.qu.usedQuarks[colors[i]].gte(tmp.qu.usedQuarks[search]))) search=colors[i]
		sorted.push(search)
	}

	colorCharge.normal = {
		color: sorted[0],
		charge: colorPowers[sorted[0]] * Decimal.div(
			Decimal.sub(tmp.qu.usedQuarks[sorted[0]], tmp.qu.usedQuarks[sorted[1]]),
			Decimal.add(tmp.qu.usedQuarks[sorted[0]], 1)
		)
	}
	if (player.ghostify.milestones <= 2) colorCharge[sorted[0]] = colorCharge.normal.charge
	if (tmp.qu.usedQuarks[sorted[0]] > 0 && colorCharge.normal.charge == 0) giveAchievement("Hadronization")

	updateQuarksTabOnUpdate()
}

function getColorPowerQuantity(color) {
	let ret = colorCharge[color] * tmp.glB[color].mult
	if (tmp.qkEng) ret = ret * tmp.qkEng.eff1 + tmp.qkEng.eff2
	if (tmp.glB) ret = ret - tmp.glB[color].sub
	return Math.max(ret, 0)
}

colorBoosts = {
	r: 1,
	g: 1,
	b: 1
}

function updateColorPowers() {
	//Red
	colorBoosts.r = Math.log10(tmp.qu.colorPowers.r * 2 + 1) / 2 + 1

	//Green
	colorBoosts.g = Math.log10(tmp.qu.colorPowers.g * 3 + 1) * 2 + 1

	//Blue
	colorBoosts.b = Math.pow(Math.max(tmp.qu.colorPowers.b * 1.5 + 1, 1), 2)
}

//Gluons
function gainQuarkEnergy() {
	let x = Math.cbrt(quantumWorth.add(1).log10()) * getQuarkEnergyMult() * 1.25
	tmp.qu.quarkEnergy = isNaN(x) ? 0 : x
}

function getQuarkEnergyMult() {
	let x = 1
	if (ENTANGLED_BOOSTS.active("glu", 1)) x += tmp.enB.glu1
	return x
}

function updateQuarkEnergyEffects() {
	tmp.qkEng = {}

	tmp.qkEng.eff1 = Math.pow(Math.log10(tmp.qu.quarkEnergy / 1.7 + 1) + 1, 2)
	tmp.qkEng.eff2 = Math.pow(tmp.qu.quarkEnergy, 2) * tmp.qkEng.eff1 / 4
}

GUCosts = [null, 1, 2, 4, 100, 7e15, 4e19, 3e28, "1e570"]

function GUBought(id) {
	return player.quantum && player.quantum.upgrades.includes(id)
}

function GUActive(id) {
	return false
}

function buyQuarkMult(name) {
	var cost = Decimal.pow(100, tmp.qu.multPower[name] + Math.max(tmp.qu.multPower[name] - 467, 0)).times(500)
	if (tmp.qu.gluons[name].lt(cost)) return
	tmp.qu.gluons[name] = tmp.qu.gluons[name].sub(cost).round()
	tmp.qu.multPower[name]++
	tmp.qu.multPower.total++
	updateGluonsTab("spend")
	if (tmp.qu.autobuyer.mode === 'amount') {
		tmp.qu.autobuyer.limit = Decimal.times(tmp.qu.autobuyer.limit, 2)
		getEl("priorityquantum").value = formatValue("Scientific", tmp.qu.autobuyer.limit, 2, 0);
	}
}

function maxQuarkMult() {
	var names = ["rg", "gb", "br"]
	var bought = 0
	for (let c = 0; c < 3; c++) {
		var name = names[c]
		var buying = true
		while (buying) {
			var cost = Decimal.pow(100, tmp.qu.multPower[name] + Math.max(tmp.qu.multPower[name] - 467, 0)).times(500)
			if (tmp.qu.gluons[name].lt(cost)) buying = false
			else if (tmp.qu.multPower[name] < 468) {
				var toBuy = Math.min(Math.floor(tmp.qu.gluons[name].div(cost).times(99).add(1).log(100)),468-tmp.qu.multPower[name])
				var toSpend = Decimal.pow(100, toBuy).sub(1).div(99).times(cost)
				if (toSpend.gt(tmp.qu.gluons[name])) tmp.qu.gluons[name]=new Decimal(0)
				else tmp.qu.gluons[name] = tmp.qu.gluons[name].sub(toSpend).round()
				tmp.qu.multPower[name] += toBuy
				bought += toBuy
			} else {
				var toBuy=Math.floor(tmp.qu.gluons[name].div(cost).times(9999).add(1).log(1e4))
				var toSpend=Decimal.pow(1e4, toBuy).sub(1).div(9999).times(cost)
				if (toSpend.gt(tmp.qu.gluons[name])) tmp.qu.gluons[name]=new Decimal(0)
				else tmp.qu.gluons[name] = tmp.qu.gluons[name].sub(toSpend).round()
				tmp.qu.multPower[name] += toBuy
				bought += toBuy
			}
		}
	}
	tmp.qu.multPower.total += bought
	if (tmp.qu.autobuyer.mode === 'amount') {
		tmp.qu.autobuyer.limit = Decimal.times(tmp.qu.autobuyer.limit, Decimal.pow(2, bought))
		getEl("priorityquantum").value = formatValue("Scientific", tmp.qu.autobuyer.limit, 2, 0)
	}
	updateGluonsTabOnUpdate("spend")
}

function updateGluonicBoosts() {
	tmp.glB = {}
	tmp.enB = {}

	let data = tmp.glB
	let enBData = ENTANGLED_BOOSTS
	let gluons = tmp.qu.gluons

	data.r = { mult: getGluonEffBuff(gluons.rg), sub: getGluonEffNerf(gluons.br) } //x -> x * [RG effect] - [BR effect]
	data.g = { mult: getGluonEffBuff(gluons.gb), sub: getGluonEffNerf(gluons.rg) } //x -> x * [GB effect] - [RG effect]
	data.b = { mult: getGluonEffBuff(gluons.br), sub: getGluonEffNerf(gluons.gb) } //x -> x * [BR effect] - [GB effect]

	let type = tmp.qu.entColor || "rg"
	let enAmt = enBData.gluonEff(gluons[type])
	let masAmt = Math.max(Math.max(
		enBData.gluonEff(gluons.rg),
		enBData.gluonEff(gluons.gb)),
		enBData.gluonEff(gluons.br)
	)

	let data2 = tmp.enB
	for (var t = 0; t < enBData.types.length; t++) {
		var name = enBData.types[t]
		var typeData = enBData[name]
		var strEff = typeData.eff()

		for (var i = 1; i <= typeData.max; i++) {
			if (!enBData.has(name, i)) break
			data2[name + i] = typeData[i].eff((name != "glu" ? 1 : enBData.mastered(name, i) ? masAmt : enAmt) * strEff)
		}
	}
}

function getGluonEffBuff(x) {
	return Math.log10(Decimal.add(x, 1).log10() * 5 + 1) + 1
}

function getGluonEffNerf(x) {
	return Math.pow(Decimal.add(x, 1).log10(), 2)
}

let ENTANGLED_BOOSTS = {
	buy(type) {
		let data = this[type]
		if (!(data.engAmt() >= data.cost())) return
		data.set(data.amt() + 1)
		updateGluonicBoosts()
		ENTANGLED_BOOSTS.update(type)
	},
	maxBuy(type) {
		let data = this[type]
		if (!(data.engAmt() >= data.cost())) return
		data.set(data.target())
		updateGluonicBoosts()
		ENTANGLED_BOOSTS.update(type)
	},

	has(type, x) {
		let data = this[type]
		return ph.did("quantum") && data.amt() >= data[x].req
	},
	active(type, x) {
		let data = this[type]

		if (!this.has(type, x)) return false
		if (this.mastered(type, x)) return true


		let gluon = tmp.qu.entColor || "rg"
		return data[x].type == gluon[0] || data[x].type == gluon[1]
	},
	mastered(type, x) {
		let data = this[type]
		return ph.did("quantum") && data.amt() >= data[x].masReq
	},

	gluonEff(x) {
		return Decimal.add(x, 1).log10()
	},

	choose(x) {
		if (!tmp.qu.entBoosts || tmp.qu.gluons.rg.max(tmp.qu.gluons.gb).max(tmp.qu.gluons.br).eq(0)) {
			alert("You need to get at least 1 Entangled Boost and have gluons before choosing a type!")
			return
		}
		if (!confirm("This will perform a quantum reset without gaining anything. Are you sure?")) return
		tmp.qu.entColor = x
		quantum(false, true)
	},

	types: ["glu", "pos"],
	glu: {
		name: "Entangled",

		cost(x) {
			if (x === undefined) x = this.amt()
			return Math.pow(x, 1.5) + 1
		},
		target() {
			return Math.floor(Math.pow(this.engAmt() - 1, 1 / 1.5) + 1)
		},

		amt() {
			return tmp.qu.entBoosts || 0
		},
		engAmt() {
			return tmp.qu.quarkEnergy
		},
		set(x) {
			tmp.qu.entBoosts = x
		},

		eff(x) {
			return (this.amt()) * 2 - 1 //temp
		},

		max: 9,
		1: {
			req: 1,
			masReq: 3,
			type: "r",
			eff(x) {
				return Math.cbrt(x) * 0.75
			},
			effDisplay(x) {
				return shorten(x)
			}
		},
		2: {
			req: 2,
			masReq: 10,
			type: "g",
			eff(x) {
				return Math.log10(x * 2 + 1) * 1.25 + 1
			},
			effDisplay(x) {
				return x.toFixed(3)
			}
		},
		3: {
			req: 3,
			masReq: 10,
			type: "b",
			eff(x) {
				return Math.pow(x / 3 + 1, 0.2)
			},
			effDisplay(x) {
				return formatReductionPercentage(x, 2)
			}
		},
		4: {
			req: 5,
			masReq: 12,
			type: "b",
			eff(x) {
				return Decimal.pow(2, Math.pow(player.eternityPoints.add(1).log10(), 0.25))
			},
			effDisplay(x) {
				return shorten(x)
			}
		},
		5: {
			req: 7,
			masReq: 15,
			type: "r",
			eff(x) {
				return 1
			},
			effDisplay(x) {
				return shorten(x)
			}
		},
		6: {
			req: 9,
			masReq: 18,
			type: "g",
			eff(x) {
				return 1
			},
			effDisplay(x) {
				return shorten(x)
			}
		},
		7: {
			req: 12,
			masReq: 21,
			type: "r",
			eff(x) {
				return 1
			},
			effDisplay(x) {
				return shorten(x)
			}
		},
		8: {
			req: 15,
			masReq: 24,
			type: "b",
			eff(x) {
				return 1
			},
			effDisplay(x) {
				return shorten(x)
			}
		},
		9: {
			req: 18,
			masReq: 27,
			type: "g",
			eff(x) {
				return 1
			},
			effDisplay(x) {
				return shorten(x)
			}
		}
	},
	pos: {
		name: "Positronic",

		cost(x) {
			if (x === undefined) x = this.amt()
			return Math.pow(x, 1.5) + 1
		},
		target() {
			return Math.floor(Math.pow(this.engAmt() - 1, 1 / 1.5) + 1)
		},

		amt() {
			return 1
		},
		engAmt() {
			return 0
		},
		set(x) {
			//tmp.qu.entBoosts = x
		},

		eff(x) {
			return this.engAmt()
		},

		max: 1,
		1: {
			req: 1,
			masReq: 3,
			type: "g",
			eff(x) {
				return x + 1
			},
			effDisplay(x) {
				return shorten(x)
			}
		}
	},

	update(type) {
		var data = ENTANGLED_BOOSTS
		var typeData = data[type]

		getEl("enB_" + type + "_amt").textContent = getFullExpansion(typeData.amt() || 0)
		getEl("enB_" + type + "_cost").textContent = shorten(typeData.cost())
		getEl("enB_" + type + "_next").textContent = ""

		var has = true
		var mastered = true

		for (var e = 1; e <= typeData.max; e++) {
			if (has && !data.has(type, e)) {
				has = false
				getEl("enB_" + type + "_next").textContent = "Next " + typeData.name + " Boost unlocks at " + typeData[e].req + " " + typeData.name + " Boosters."
			}
			if (mastered && !data.mastered(type, e)) mastered = false

			var el = getEl("enB_" + type + e + "_name")
			el.parentElement.style.display = has ? "" : "none"

			if (has) {
				el.parentElement.className = mastered ? "yellow" : data.active("glu", e) ? "green" : "red"
				el.textContent = (mastered ? " Mastered" : data.active("glu", e) ? "" : "Inactive ") + " " + typeData.name + " Boost #" + e

				getEl("enB_" + type + e + "_type").innerHTML = (mastered ? "(formerly " : "(") + typeData[e].type.toUpperCase() + "-type boost" + (mastered ? ")" : " - Get " + getFullExpansion(typeData[e].masReq) + " " + typeData.name + " Boosters to master)")
			}
		}
	},
	updateOnTick(type) {
		let data = this[type]

		if (getEl("enB_" + type + "_eng") !== null) getEl("enB_" + type + "_eng").textContent = shorten(data.engAmt())
		getEl("enB_" + type + "_buy").className = data.engAmt() >= data.cost() ? "storebtn" : "unavailablebtn"

		for (var i = 1; i <= data.max; i++) {
			if (!this.has(type, i)) break
			getEl("enB_" + type + i + "_eff").textContent = data[i].effDisplay(tmp.enB[type + i])
		}
	}
}

function gainQKOnQuantum() {
	var u = tmp.qu.usedQuarks
	var g = tmp.qu.gluons
	var p = ["rg", "gb", "br"]
	var d = []
	for (var c = 0; c < 3; c++) d[c] = u[p[c][0]].min(u[p[c][1]])
	for (var c = 0; c < 3; c++) {
		g[p[c]] = g[p[c]].add(d[c]).round()
		u[p[c][0]] = u[p[c][0]].sub(d[c]).round()
	}

	updateColorCharge()
}

//Display
function updateQuarksTab(tab) {
	getEl("redPower").textContent = shorten(tmp.qu.colorPowers.r)
	getEl("greenPower").textContent = shorten(tmp.qu.colorPowers.g)
	getEl("bluePower").textContent = shorten(tmp.qu.colorPowers.b)

	getEl("redTranslation").textContent = formatPercentage(colorBoosts.r - 1)
	getEl("greenTranslation").textContent = formatReductionPercentage(colorBoosts.g)
	getEl("blueTranslation").textContent = shorten(colorBoosts.b)

	getEl("quarkEnergyEffect1").textContent = formatPercentage(tmp.qkEng.eff1 - 1)
	getEl("quarkEnergyEffect2").textContent = shorten(tmp.qkEng.eff2)

	if (player.ghostify.milestones >= 8) {
		var assortAmount = getAssortAmount()
		var colors = ['r','g','b']
		getEl("assort_amount").textContent = shortenDimensions(assortAmount.times(getQuarkAssignMult()))
		getEl("assignAllButton").className = (assortAmount.lt(1) ? "unavailabl" : "stor") + "ebtn"
		updateQuantumWorth("display")
	}
}

function updateGluonsTab() {
	let colors = ['r','g','b']

	if (player.ghostify.milestones >= 8) updateGluonsTabOnUpdate("display")

	for (var c = 0; c < 3; c++) {
		var color = colors[c]
		getEl(color + "PowerBuff").textContent = shorten(tmp.glB[color].mult)
		getEl(color + "PowerNerf").textContent = shorten(tmp.glB[color].sub)
		getEl(color + colors[(c + 1) % 3]).textContent = shortenDimensions(tmp.qu.gluons[color + colors[(c + 1) % 3]])
	}

	ENTANGLED_BOOSTS.updateOnTick("glu")
}

//Display: On load
function updateQuarksTabOnUpdate(mode) {
	var colors = ['r','g','b']
	if (colorCharge.normal.charge == 0) getEl("colorCharge").innerHTML='neutral charge'
	else {
		var color = colorShorthands[colorCharge.normal.color]
		getEl("colorCharge").innerHTML='<span class="'+color+'">'+color+'</span> charge of <span class="'+color+'" style="font-size:35px">' + shorten(colorCharge.normal.charge * tmp.qkEng.eff1) + "</span>"
	}

	getEl("redQuarks").textContent = shortenDimensions(tmp.qu.usedQuarks.r)
	getEl("greenQuarks").textContent = shortenDimensions(tmp.qu.usedQuarks.g)
	getEl("blueQuarks").textContent = shortenDimensions(tmp.qu.usedQuarks.b)

	var assortAmount = getAssortAmount()
	var canAssign = assortAmount.gt(0)

	getEl("assort_amount").textContent = shortenDimensions(assortAmount.times(getQuarkAssignMult()))
	getEl("redAssort").className = canAssign ? "storebtn" : "unavailablebtn"
	getEl("greenAssort").className = canAssign ? "storebtn" : "unavailablebtn"
	getEl("blueAssort").className = canAssign ? "storebtn" : "unavailablebtn"

	var uq = tmp.qu.usedQuarks
	var gl = tmp.qu.gluons
	for (var p = 0; p < 3; p++) {
		var pair = (["rg", "gb", "br"])[p]
		var diff = uq[pair[0]].min(uq[pair[1]])
		getEl(pair + "gain").textContent = shortenDimensions(diff)
		getEl(pair + "prev").textContent = shortenDimensions(uq[pair[0]])
		getEl(pair + "next").textContent = shortenDimensions(uq[pair[0]].sub(diff).round())
	}
	getEl("assignAllButton").className = canAssign ? "storebtn" : "unavailablebtn"
	if (masteryStudies.has("d13")) {
		getEl("redQuarksToD").textContent = shortenDimensions(tmp.qu.usedQuarks.r)
		getEl("greenQuarksToD").textContent = shortenDimensions(tmp.qu.usedQuarks.g)
		getEl("blueQuarksToD").textContent = shortenDimensions(tmp.qu.usedQuarks.b)	
	}
}

function updateGluonsTabOnUpdate(mode) {
	if (!player.masterystudies) return
	else if (!tmp.qu.gluons.rg) {
		tmp.qu.gluons = {
			rg: new Decimal(0),
			gb: new Decimal(0),
			br: new Decimal(0)
		}
	}

	ENTANGLED_BOOSTS.update("glu")
	ENTANGLED_BOOSTS.update("pos") //Temp

	getEl("masterNote").style.display = ENTANGLED_BOOSTS.mastered("glu", 1) ? "" : "none"
}

//Quarks animation
var quarks={}
var centerX
var centerY
var maxDistance
var code

function drawQuarkAnimation(ts){
	centerX = canvas.width/2
	centerY = canvas.height/2
	maxDistance=Math.sqrt(Math.pow(centerX,2)+Math.pow(centerY,2))
	code=player.options.theme=="Aarex's Modifications"?"e5":"99"
	if (getEl("quantumtab").style.display !== "none" && getEl("uquarks").style.display !== "none" && player.options.animations.quarks) {
		qkctx.clearRect(0, 0, canvas.width, canvas.height);
		quarks.sum = tmp.qu.colorPowers.r + tmp.qu.colorPowers.g + tmp.qu.colorPowers.b
		quarks.amount=Math.ceil(Math.min(quarks.sum, 200))
		for (p=0;p<quarks.amount;p++) {
			var particle=quarks['p'+p]
			if (particle==undefined) {
				particle={}
				var random=Math.random()
				if (random<=tmp.qu.colorPowers.r/quarks.sum) particle.type='r'
				else if (random>=1-tmp.qu.colorPowers.b/quarks.sum) particle.type='b'
				else particle.type='g'
				particle.motion=Math.random()>0.5?'in':'out'
				particle.direction=Math.random()*Math.PI*2
				particle.distance=Math.random()
				quarks['p'+p]=particle
			} else {
				particle.distance+=0.01
				if (particle.distance>=1) {
					var random=Math.random()
					if (random<=tmp.qu.colorPowers.r/quarks.sum) particle.type='r'
					else if (random>=1-tmp.qu.colorPowers.b/quarks.sum) particle.type='b'
					else particle.type='g'
					particle.motion=Math.random()>0.5?'in':'out'
					particle.direction=Math.random()*Math.PI*2
					particle.distance=0
				}
				var actualDistance=particle.distance*maxDistance
				if (particle.motion=="in") actualDistance=maxDistance-actualDistance
				qkctx.fillStyle=particle.type=="r"?"#"+code+"0000":particle.type=="g"?"#00"+code+"00":"#0000"+code
				point(centerX+Math.sin(particle.direction)*actualDistance, centerY+Math.cos(particle.direction)*actualDistance, qkctx)
			}
		}
		delta = (ts - lastTs) / 1000;
		lastTs = ts;
		requestAnimationFrame(drawQuarkAnimation);
	}
}
