function carousel(carouselWrap) {
	var movement = 0;

	var move = function (left) {

		if (left) {
			movement++;

			var items = carouselWrap.find('div.card').length;
			if (movement > items - 4) {
				movement = items - 4;
			}
		} else {
			movement--;
			if (movement < 0) {
				movement = 0
			}
		}

		var left = movement * (-25);

		if (movement <= 0) {
			carouselWrap.find('button.left').hide();
		} else {
			carouselWrap.find('button.left').show();
		}

		if (movement >= items - 4) {
			carouselWrap.find('button.right').hide();
		} else {
			carouselWrap.find('button.right').show();
		}

		carouselWrap.find('div.inner-carousel').animate({
			left: left + '%'
		})
	}

	carouselWrap.find('button.left').click(function (e) {
		e.preventDefault();
		move(false);
		return false;
	});
	carouselWrap.find('button.right').click(function (e) {
		e.preventDefault();
		move(true);
		return false;
	});

	if (movement <= 0) {
		carouselWrap.find('button.left').hide();
	} else {
		carouselWrap.find('button.left').show();
	}

	if (movement >= items - 4) {
		carouselWrap.find('button.right').hide();
	} else {
		carouselWrap.find('button.right').show();
	}
}