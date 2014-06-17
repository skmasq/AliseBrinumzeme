/// <reference path="~/Scripts/_references.js" />

var tween_api = {
	sections: {
		thumbnails: {
			hover: function (__thisItem) {
				var _self = this;

				_self.tl = new TimelineMax({
					paused: true,
					onStart: function () {
						__thisItem.css({ zIndex: 3 });
					},
					onReverseComplete: function () {
						__thisItem.css({ zIndex: "auto" });
					},
					onUpdate: function () {
						if (_self.tl.reversed()) {
							__thisItem.css({ zIndex: 2 });
						} else {
							__thisItem.css({ zIndex: 3 });
						}
					}
				});

				_self.hoverSpeed = 0.2;

				_self.tl.add(TweenMax.to(__thisItem, _self.hoverSpeed, {
					css: {
						scale: 1.2
					},
					ease: Power3.easeInOut
				}));

				return _self.tl;
			}
		}
	}
}

var test = function () {

	/* Bird's beak animation*/
	var tl = new TimelineLite({ paused: true });
	var sk = 3;
	var tVar;

	var topBeak = $(".bubble-bird-top-beak"),
		bottomBeak = $(".bubble-bird-bottom-beak");

	tl
		.from(topBeak, 0.2, { rotation: "0", }, 0, "openTop")
		.from(bottomBeak, 0.2, { rotation: "0", }, 0.3, "openTop")
		.to(topBeak, 0.2, {
			rotation: "-=15",
			transformOrigin: "left 0",
			repeat: sk,
			ease: Power2.easeInOut
		}, 0.3, "openTop"
      )
		.to(bottomBeak, 0.2, {
			rotation: "+=15",
			transformOrigin: "left 0",
			repeat: sk,
			ease: Power2.easeInOut
		}, 0.3, "openBottom");

	tl.timeScale(1);

	return {
		play: function () {
			tl.restart().play().eventCallback("onComplete", function () {
				tl.restart().pause();
			});
		}
	}
}

var test1 = new test();

$(document).ready(function () {
	$('.main-scene-container').find("img").eq(0).show();
	setSection();
	prepareImageMargins();
	initBGSwitch();
	initThumbnails();
	bubbleTextInit();
	birdInit();
	lampInit();
});

function lampInit() {
	/// <summary>
	/// Initiate lamp swing
	/// </summary>
	var
		$lamp = $("#lamp"),					// Lamp element
		$swingAmplitude = 10,				// Lamp swing aplitude
		$swingInterval = 4,					// Swing Interval
		$swingEasing = Power2.easeInOut;	// Swing Easing

	// Set initial state
	/*
		- Add 15 more degrees at initial state to create impulse effect
		- Position rotation at center top of lamp image
	*/
	TweenLite.set($lamp, { transformOrigin: "center top", rotation: -($swingAmplitude) });

	var swingLampLeft = function () {
		TweenMax.to($lamp, $swingInterval, {
			rotation: $swingAmplitude,
			ease: $swingEasing,
			onComplete: swingLampRight
		});
	};

	var swingLampRight = function () {
		TweenMax.to($lamp, $swingInterval, {
			rotation: -$swingAmplitude,
			ease: $swingEasing,
			onComplete: swingLampLeft
		});
	};

	// Start the swing
	swingLampLeft();
}

function birdInit() {
	/// <summary>
	/// Initiate lamp swing
	/// </summary>
	var
		$string = $(".string-container"),
		$key = $(".key-element"),
		$key_swing = [5, -10],
		$string_swing = [15, -15],
		$general_interval = 2,
		$swingEasing = Quad.easeInOut;	// Swing Easing

	// Set initial state
	TweenLite.set($key, { transformOrigin: "center top", rotationZ: $key_swing[0] });
	TweenLite.set($string, { transformOrigin: "center top", rotationZ: $string_swing[0] });

	var animationActive = true;

	// Left swing
	var leftSwing = new TimelineMax({
		paused: true,
		onComplete: function () {
			if (animationActive) {
				rightSwing.restart().play();
			}
		}
	});

	leftSwing.add(TweenMax.to($string, $general_interval, {
		css: {
			rotationZ: $string_swing[1]
		},
		ease: $swingEasing
	}), 0);
	leftSwing.add(TweenMax.to($key, $general_interval, {
		css: {
			rotationZ: $key_swing[1]
		},
		ease: $swingEasing
	}), 0.5);

	// Right swing
	var rightSwing = new TimelineMax({
		paused: true,
		onComplete: function () {
			if (animationActive) {
				leftSwing.restart().play();
			}
		}
	});

	rightSwing.add(TweenMax.to($string, $general_interval, {
		css: {
			rotationZ: $string_swing[0]
		},
		ease: $swingEasing
	}), 0);
	rightSwing.add(TweenMax.to($key, $general_interval, {
		css: {
			rotationZ: $key_swing[0]
		},
		ease: $swingEasing
	}), 0.5);

	leftSwing.play();
}

function setSection() {
	// Set state
	TweenMax.set($("#section-wrap"), {
		css: {
			rotationX: 200,
			rotationY: 65,
			rotationZ: 30,
			scale: 0.7,
			x: "-200px",
			transformPerspective: 300,
			transformOrigin: "50% 50% -700",
			zIndex: 0
		}
	});

	$(document).on("click", ".menu-hitbox", function () {
		openSection();
	})
}

function openSection() {
	var self = this;
	self.__ele_imagebg = $("#section-wrap")

	self.SecondVariant = new TimelineMax({
		paused: true,
		onComplete: function () {
			self.__ele_imagebg.find(".section-content-wrap").eq(0).fadeIn();
		},
		onUpdate: function () {
			if (self.SecondVariant.progress() > 0.8) {
				html2canvas($("#viewport"), {
					background: "#000",
					onrendered: function (canvas) {
						$(".overlaping-blur").show();
						$("#canvas-container").append(canvas);
						$("canvas").attr("id", "canvas");
						stackBlurCanvasRGB(
							'canvas',
						0,
						0,
						$("canvas").width(),
						$("canvas").height(), 7);

					}
				});
			}
		}
	});

	self.SecondVariant.add(TweenMax.to(self.__ele_imagebg, 1, {
		css: {
			rotationX: 0,
			rotationY: 0,
			rotationZ: 0,
			scale: 1,
			x: "0px"
		}
	}), 0);

	self.SecondVariant.add(TweenMax.to(self.__ele_imagebg, 0.25, {
		css: {
			opacity: 1
		}
	}), 0);

	self.SecondVariant.set(self.__ele_imagebg, {
		css: {
			zIndex: 600
		}
	}, 0.25);

	self.SecondVariant.play();
}

function bubbleTextInit() {
	var comonTimer;
	$(document).on("mouseenter", ".menu-hitbox", function () {
		var $ele = $(this);
		comonTimer = setTimeout(function () {
			test1.play();
			$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").fadeIn();
		}, 300);
	}).on("mouseleave", ".menu-hitbox", function () {
		var $ele = $(this);
		clearTimeout(comonTimer);
		$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").stop().fadeOut();
	});
}

function initThumbnails() {

	$("#section-wrap .thumbnail-image-container").each(function () {
		var hoverTL = new tween_api.sections.thumbnails.hover($(this));
		$(this).data("hover_tween", hoverTL);
	});

	$(document).on("mouseenter", ".thumbnail-image-container", function () {
		$(this).data("hover_tween").play();
	}).on("mouseleave", ".thumbnail-image-container", function () {
		$(this).data("hover_tween").reverse();
	});

}

function prepareImageMargins() {

	$('.main-scene-container').find("img").each(function (index) {
		if ($(this).hasClass("hpos-image")) {
			$(this).css({
				"margin-top": ((260 - $(this).height()) / 2) + "px"
			})
		} else {
			$(this).css({
				"margin-left": ((346 - $(this).width()) / 2) + "px"
			})
		}
	});

}

function initBGSwitch() {

	CSSPlugin.defaultTransformPerspective = 500;

	var $imgWrap = $('.main-scene-container'),
		$images = $imgWrap.find('img'),
		$currImg = $images.eq(0),
		index = 0,
		numImgs = $images.length,
		isAnimating = false;

	// Animation properties
	var flipDepth = -500,
		flipDur = 1;

	var flip = function (e, nextIndex) {
		// Ignore click until any current animations have completed.
		if (isAnimating) return;

		isAnimating = true;

		// Add +1 to index or loop back to 0 if we've reached the end
		index = nextIndex;

		// Get a random value between -25 and 25
		var randomVal = Math.random() * 50 - 25;

		var tl = new TimelineLite({
			onComplete: function () {
				$currImg = $images.eq(index);
				isAnimating = false;
			}
		});

		tl.to($currImg, flipDur / 2, {
			css: { rotationY: 90, z: flipDepth, rotationX: randomVal, alpha: 0.3 },
			ease: Expo.easeIn
		});

		tl.append(function () {
			$currImg.hide();
			$images.eq(index).show();
		})

		tl.fromTo($images.eq(index), flipDur / 2,
			// We need to flip the number sign fo rotationX, so we do -randomVal instead of randomVal
			{ css: { rotationY: -90, z: flipDepth, rotationX: -randomVal, alpha: 0.3 } },
			{ css: { rotationY: 0, z: 0, rotationX: 0, alpha: 1 }, ease: Expo.easeOut }
		);
	};

	// Animate first image in
	TweenMax.fromTo($currImg, 1.8,
		{ css: { rotationY: -110, rotationX: Math.random() * 35, z: -1000, alpha: 0 } },
		{
			css: { rotationY: 0, rotationX: 0, z: 0, alpha: 1 }, ease: Power3.easeInOut
		});

	$currImg.show();

	$(document).on("click", ".thumbnail-image-container", function (e) {
		var nextIndex = $(this).find("img").eq(0).data("mainsceneimageindex") - 1;
		flip(e, nextIndex);
	});

}