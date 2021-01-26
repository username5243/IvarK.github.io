var stuckTimeout
stuckTimeout = setTimeout(function(){
	showStuckPopup()
},5000)
function showStuckPopup() {
	getEl("stuck").style.display="block"
}