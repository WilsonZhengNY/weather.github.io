
<!-- const form = document.querySelector("form"); -->
var timezone_ = 0;
var placeholder_1 = " °F";
var placeholder_2 = " mph";



f
		AM = "PM";
	} else if (h == 12) {
                AM = "PM";
                returner = h.toString();
        } else if (h == 0) {
		returner = "12";
	} else {
		returner = h.toString();
	}
	if (m < 10) {
		returner += ":0" + m.toString();
	} else {
		returner += ":" + m.toString();
	}
	return returner + " " + AM;
}

