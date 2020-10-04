let Prestiges = {
	order: ["paradox", "accelerate", "galaxy", "infinity", "eternity", "interreality", "quantum", "ghostify", "planck"],
	reqs: {
		paradox() {
			return player.matter.max(player.money).gte(1e3) && player.totalTickGained && !tmp.ri
		},
		accelerate() {
			return false
		},
		galaxy() {
			return getGSAmount().gte(1) && !tmp.ri
		},
		infinity() {
			return player.money.gte(Number.MAX_VALUE) && player.currentChallenge == "" && player.break
		},
		eternity() {
			var id7unlocked = player.infDimensionsUnlocked[7]
			if (getEternitied() >= 25 || (tmp.ngp3 && tmp.qu.bigRip.active)) id7unlocked = true
			return player.infinityPoints.gte(player.currentEternityChall != "" ? player.eternityChallGoal : Number.MAX_VALUE) && id7unlocked
		},
		interreality() {
			return ECTimesCompleted("eterc10") >= 1
		},
		quantum() {
			return player.money.log10() >= getQCGoalLog() &&
				Decimal.gte(
					player.achievements.includes("ng3p76") ? player.meta.bestOverQuantums : player.meta.antimatter, 
					getQuantumReq(undefined, tmp.ngp3 && tmp.qu.bigRip.active)
				) && (!player.masterystudies || ECTimesCompleted("eterc14")) && quarkGain().gt(0)
		},
		ghostify() {
			return tmp.qu.bigRip.active ? this.quantum() : hasNU(16) || pl.on()
		},
		planck() {
			return pl.can()
		}
	},
	modReqs: {
		paradox() {
			return player.pSac !== undefined
		},
		accelerate() {
			return tmp.ngmX >= 6
		},
		galaxy() {
			return player.galacticSacrifice !== undefined
		},
		interreality() {
			return player.galacticSacrifice !== undefined
		},
		quantum() {
			return player.meta !== undefined
		},
		ghostify() {
			return player.ghostify !== undefined
		},
		planck() {
			return player.pl !== undefined
		}
	},
	can(id) {
		return ph.tmp[id] && ph.reqs[id]()
	},
	didData: {
		paradox() {
			return player.pSac.times >= 1
		},
		accelerate() {
			return false
		},
		galaxy() {
			return player.galacticSacrifice.times >= 1
		},
		infinity() {
			return player.infinitied >= 1
		},
		eternity() {
			return player.eternities >= 1
		},
		interreality() {
			return false
		},
		quantum() {
			return tmp.qu.times >= 1
		},
		ghostify() {
			return player.ghostify.times >= 1
		},
		planck() {
			return player.pl.times >= 1
		}
	},
	did(id) {
		return ph.tmp[id] && ph.tmp[id].did
	},
	has(id){
		return ph.tmp[id] && ph.tmp[id].did
	},
	displayData: {
		paradox: ["pSac", "px", "paradoxbtn"],
		accelerate: ["accReset", "vel", "accTabBtn"],
		galaxy: ["sacrificebtn", "galaxyPoints2", "galaxybtn"],
		infinity: ["postInfinityButton", "infinityPoints2", "infinitybtn"],
		eternity: ["eternitybtn", "eternityPoints2", "eternitystorebtn"],
		interreality: ["irReset", "irEmpty", "irTabBtn"],
		quantum: ["quantumbtn", "quantumInfo", "quantumtabbtn"],
		ghostify: ["ghostifybtn", "ghostparticles", "ghostifytabbtn"],
		planck: ["planck", "planckinfo", "plancktabbtn"],
	},
	shown(id) {
		if (id == "eternity" && !tmp.eterUnl) return false
		if (id == "quantum" && !tmp.quUnl) return false
		return ph.tmp[id] && !player.aarexModifications.layerHidden[id]
	},
	tmp: {},
	reset() {
		var did = false
		ph.tmp = { layers: 0 }
		for (var x = ph.order.length; x > 0; x--) {
			var p = ph.order[x - 1]
			if (ph.modReqs[p] === undefined || ph.modReqs[p]()) {
				ph.tmp[p] = {}
				if (!did && ph.didData[p]()) did = true
				if (did) ph.onPrestige(p)
				document.getElementById("hide" + p).style.display = did ? "" : "none"
				document.getElementById("hide" + p).innerHTML = (player.aarexModifications.layerHidden[p] ? "Show" : "Hide") + " " + p
			} else document.getElementById("hide" + p).style.display = "none"
		}
	},
	updateDisplay() {
		ph.tmp.shown = 0
		for (var x = 0; x < ph.order.length; x++) {
			var p = ph.order[x]
			var d = ph.displayData[p]
			var prestigeShown = false
			var tabShown = false
			var shown = false

			if (ph.tmp[p] !== undefined && ph.shown(p)) {
				if (ph.can(p)) prestigeShown = true
				if (ph.tmp[p].did) tabShown = true
				if (prestigeShown || tabShown) {
					shown = true
					ph.tmp.shown++
				}
			}
			if (ph.tmp[p] !== undefined) {
				ph.tmp[p].shown = shown
				ph.tmp[p].order = ph.tmp.shown + (shown ? 0 : 1)
			}

			document.getElementById(d[0]).style.display = prestigeShown ? "" : "none"
			document.getElementById(d[1]).style.display = tabShown ? "" : "none"
			document.getElementById(d[2]).style.display = tabShown && !isEmptiness && (p != "quantum" || !inQCModifier("ms")) ? "" : "none"

			document.getElementById(d[0]).className = "presBtn presPos" + ph.tmp.shown + " " + p + "btn"
			document.getElementById(d[1]).className = "presCurrency" + ph.tmp.shown
		}

		let bigRipAndQuantum = (pl && pl.save) ? (!pl.save.on && !hasNU(16)) : false

		//Quantum (after Neutrino Upgrade 16)
		if (!bigRipAndQuantum && inQC(0)) document.getElementById("quantumbtn").style.display = "none"

		//Big Rip
		var canBigRip = canQuickBigRip() && (ph.shown("quantum") || bigRipAndQuantum)
		document.getElementById("bigripbtn").style.display = canBigRip ? "" : "none"
		if (canBigRip) {
			let pos = bigRipAndQuantum ? "ghostify" : "quantum"
			document.getElementById("bigripbtn").className = "presBtn presPos" + (ph.tmp[pos].shown ? ph.tmp[pos].order : ph.tmp.shown + 1) + " quickBigRip"
			if (!ph.tmp[pos].shown) ph.tmp.shown++
		}

		if (tmp.ngp3 && tmp.qu.bigRip.active) {
			document.getElementById("quantumbtn").className = "presBtn presPos" + (ph.tmp.quantum.shown ? ph.tmp.quantum.order : ph.tmp.shown + 1) + " quickBigRip"
			document.getElementById("quantumbtn").style.display = ""
			if (!ph.tmp.quantum.shown) ph.tmp.shown++
		}
	},
	onPrestige(layer) {
		if (ph.tmp[layer].did) return
		ph.tmp[layer].did = true
		ph.tmp.layers++
		document.getElementById("hide" + layer).style.display = ""
	},
	setupHTML(layer) {
		var html = ""
		for (var x = 0; x < ph.order.length; x++) {
			var p = ph.order[x]
			html += '<button id="hide' + p + '" onclick="ph.hideOption(\'' + p + '\')" class="storebtn" style="color:black; width: 200px; height: 55px; font-size: 15px"></button> '
		}
		document.getElementById("hideLayers").innerHTML = html
	},
	hideOption(layer) {
		if (player.aarexModifications.layerHidden[layer]) delete player.aarexModifications.layerHidden[layer]
		else player.aarexModifications.layerHidden[layer] = true

		if (layer == "eternity" && !player.aarexModifications.layerHidden.eternity) {
			if (document.getElementById("timedimensions").style.display == "block" || document.getElementById("metadimensions").style.display == "block") showDimTab("antimatterdimensions")
			if (document.getElementById("eternitychallenges").style.display == "block") showChallengeTab("normalchallenges")
		}
		if (layer == "quantum") handleDisplaysOutOfQuantum()

		document.getElementById("hide" + layer).innerHTML = (player.aarexModifications.layerHidden[layer] ? "Show" : "Hide") + " " + layer
	}
}

let ph = Prestiges