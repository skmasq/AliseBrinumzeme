/// <reference path="~/Scripts/_references.js" />

//#region Utils
function getFrameLenght(__array, __iterations, __delay) {
	var resultValue = 0;

	//#region Apply Rules
	for (i = 0; i < __iterations; i++) {
		resultValue += __array[i];
	}

	resultValue += __delay;
	//#endregion

	return resultValue
}
//#endregion

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
	},
	start: {
		bubblebird: function (__bird) {
			/// <summary>
			/// Total length: 0.55s
			/// </summary>
			/// <param name="__bird"></param>
			/// <returns type=""></returns>
			var tl = new TimelineMax({
				paused: true
			});

			var bird = __bird,
				legs = __bird.find(".bubble-bird-legs").eq(0);

			/*
				Speeds:
					- Bird comes from top
					- Bird lays down on doors
					- Bird gets in original position
			*/
			var tlSpeeds = [0.40, 0.2, 0.1];

			// Set Objects
			tl.add(TweenMax.set(bird, {
				css: {
					transformOrigin: "100% -200px",
					rotation: 30,
					top: -200
				}
			}));

			//#region Frame 1
			tl.add([
				TweenMax.to(bird, tlSpeeds[0], {
					css: {
						top: -53,
						rotation: 0
					}
				}), TweenMax.to(legs, tlSpeeds[0] - 0.2, {
					css: {
						height: 20
					}
				})
			]);
			//#endregion

			//#region Frame 2
			tl.add(TweenMax.to(legs, 0.2, {
				css: { height: 8 }
			}), tlSpeeds[0] - 0.2);
			//#endregion

			//#region Frame 3
			tl.add([
				TweenMax.to(bird, tlSpeeds[2], {
					css: {
						top: -56
					}
				}), TweenMax.to(legs, tlSpeeds[2], {
					css: {
						height: 13
					}
				})
			], tlSpeeds[0]);
			//#endregion

			return tl;
		},
		doorbottomcup: function (__cup) {
			/// <summary>
			/// Total length: 0.95s
			/// </summary>
			/// <param name="__cup"></param>
			/// <returns type=""></returns>
			var tl = new TimelineMax({
				paused: true
			});

			var cupbody = __cup.find(".cup-body").eq(0);

			var tlFrameSpeeds = [0.2, 0.2, 0.2, 0.15, 0.1, 0.1]

			// Set objects

			tl.add([
				TweenMax.set(__cup, {
					css: {
						transformOrigin: "57px 52px"
					}
				})
			]);

			//#region Frame 1
			tl.add(TweenMax.to(cupbody, tlFrameSpeeds[0], {
				css: { rotation: 7 }
			}), getFrameLenght(tlFrameSpeeds, 0, 0.1));
			tl.add(TweenMax.to(__cup, tlFrameSpeeds[0], {
				css: { rotation: -10 }
			}), getFrameLenght(tlFrameSpeeds, 0, 0));
			//#endregion

			//#region Frame 2
			tl.add(TweenMax.to(cupbody, tlFrameSpeeds[1], {
				css: { rotation: -7 }
			}), getFrameLenght(tlFrameSpeeds, 1, 0.1));
			tl.add(TweenMax.to(__cup, tlFrameSpeeds[1], {
				css: { rotation: 6 }
			}), getFrameLenght(tlFrameSpeeds, 1, 0));
			//#endregion

			//#region Frame 3
			tl.add(TweenMax.to(cupbody, tlFrameSpeeds[2], {
				css: { rotation: 4 }
			}), getFrameLenght(tlFrameSpeeds, 2, 0.1));
			tl.add(TweenMax.to(__cup, tlFrameSpeeds[2], {
				css: { rotation: -5 }
			}), getFrameLenght(tlFrameSpeeds, 2, 0));
			//#endregion

			//#region Frame 4

			tl.add(TweenMax.to(cupbody, tlFrameSpeeds[3], {
				css: { rotation: -5 }
			}), getFrameLenght(tlFrameSpeeds, 3, 0.1));
			tl.add(TweenMax.to(__cup, tlFrameSpeeds[3], {
				css: { rotation: 3 }
			}), getFrameLenght(tlFrameSpeeds, 3, 0));

			//#endregion

			//#region Frame 5

			tl.add(TweenMax.to(cupbody, tlFrameSpeeds[4], {
				css: { rotation: -3 }
			}), getFrameLenght(tlFrameSpeeds, 4, 0.1));
			tl.add(TweenMax.to(__cup, tlFrameSpeeds[4], {
				css: { rotation: 0 }
			}), getFrameLenght(tlFrameSpeeds, 4, 0));

			//#endregion

			//#region Frame 6

			tl.add(TweenMax.to(cupbody, tlFrameSpeeds[5], {
				css: { rotation: 0 }
			}), getFrameLenght(tlFrameSpeeds, 5, 0));

			//#endregion

			return tl;
		},
		doorrabbit: function (__rabbit) {
			/// <summary>
			/// Total length: 0.5s
			/// </summary>
			/// <param name="__rabbit"></param>
			/// <returns type=""></returns>
			var tl = new TimelineMax({
				paused: true
			});

			var tlFrameLength = [0.5]

			// Set object
			tl.add(TweenMax.set(__rabbit, {
				css: { bottom: 100, left: 70 }
			}));

			//#region Frame 1
			tl.add(TweenMax.to(__rabbit, tlFrameLength[0], {
				css: { bottom: 147, left: -58 },
				ease: Back.easeOut
			}));
			//#endregion

			return tl;
		},
		molbertrabbit: function (__rabbit) {
			/// <summary>
			/// Total length: 0.35s
			/// </summary>
			/// <param name="__rabbit"></param>
			/// <returns type=""></returns>
			var tl = new TimelineMax({
				paused: true
			});

			var tlFrameLength = [0.35]

			// Set object
			tl.add(TweenMax.set(__rabbit, {
				css: { bottom: -40 }
			}));

			//#region Frame 1
			tl.add(TweenMax.to(__rabbit, tlFrameLength[0], {
				css: { bottom: 45 },
				ease: Back.easeOut
			}));
			//#endregion

			return tl;
		},
		tablecuppile: function (__cuppile) {
			/// <summary>
			/// Total length: 1.5s
			/// </summary>
			/// <param name="__cuppile"></param>
			/// <returns type=""></returns>
			var tl = new TimelineMax({
				paused: true
			});

			var tlFrameLength = [1.5];

			var cup001 = __cuppile.find(".cup-001").eq(0),
				cup002 = __cuppile.find(".cup-002").eq(0),
				cup003 = __cuppile.find(".cup-003").eq(0),
				cup004 = __cuppile.find(".cup-004").eq(0),
				cup006 = __cuppile.find(".cup-006").eq(0),
				rabbit = $("#table-rabbit-wrap");

			//#region Set objects
			tl.add(TweenMax.set(rabbit, { css: { bottom: -150 } }));
			tl.add(TweenMax.set([cup004, cup006], {
				css: {
					transformOrigin: "bottom center"
				}
			}), 0);
			tl.add(TweenMax.set(cup001, {
				css: {
					transformOrigin: "bottom right"
				}
			}),0);
			tl.add(TweenMax.set(cup002, {
				css: {
					transformOrigin: "bottom left"
				}
			}),0);
			tl.add(TweenMax.set(cup003, {
				css: {
					bottom: -15
				}
			}),0);
			tl.add(TweenMax.set([cup001, cup002, cup004, cup006], {
				css: { rotation: 0 }
			}), 0);
			//#endregion

			//#region Frame 1

			tl.add([
				TweenMax.to(cup001, tlFrameLength[0], { css: { rotation: -15 }, ease: Elastic.easeIn }),
				TweenMax.to(cup002, tlFrameLength[0], { css: { rotation: 14 }, ease: Elastic.easeIn }),
				TweenMax.to(cup003, tlFrameLength[0], { css: { bottom: -37 }, ease: Elastic.easeIn }),
				TweenMax.to(cup004, tlFrameLength[0], { css: { rotation: -13 }, ease: Elastic.easeIn }),
				TweenMax.to(cup006, tlFrameLength[0], { css: { rotation: 13 }, ease: Elastic.easeIn }),
				TweenMax.to(rabbit, tlFrameLength[0], { css: { bottom: -34 }, ease: Elastic.easeIn })
			],0);

			//#endregion

			return tl;
		}
	},
	contacts: {
		set: function(){
			var contact_page = $("#contact-page-wrap");

			contact_page.find(".content-container").eq(0).hide();
			contact_page.find(".logo-container").eq(0).show();

			TweenMax.set(contact_page.find(".logo-container").eq(0), {
				css: {
					rotation: -90,
					top: "50%",
					left: "5%",
					marginTop: -48
				}
			});

			TweenMax.set(contact_page, {
				css: {
					rotation: 93,
					bottom: 100,
					height: 225,
					width: 151,
					marginBottom: 0,
					marginLeft: 49
				}
			});
		},
		open: function () {
			var contact_page = $("#contact-page-wrap");

			var tl = new TimelineMax({
				paused: true,
				onComplete: function () {
					contact_page.find(".content-container").eq(0).fadeIn(100);
				}
			});

			tl.add(TweenMax.to(contact_page, 1, {
				css: {
					rotation: 0,
					bottom: "50%",
					height: 740,
					width: 498,
					marginBottom: -370,
					marginLeft: -249
				}
			}),0);

			contact_page.find(".logo-container").eq(0).fadeOut(100,"linear",function () {
				tl.play();
			});
		},
		close: function () {
			var contact_page = $("#contact-page-wrap");

			var tl = new TimelineMax({
				paused: true,
				onComplete: function () {
					contact_page.find(".logo-container").eq(0).fadeIn(100);
				}
			});

			tl.add(TweenMax.to(contact_page, 1, {
				css: {
					rotation: 93,
					bottom: 100,
					height: 225,
					width: 151,
					marginBottom: 0,
					marginLeft: 49
				}
			}), 0);

			contact_page.find(".content-container").eq(0).fadeOut(100, "linear", function () {
				tl.play();
			});
		}
	}
}

var bubbleBirdBeakAnimation = function () {

	/* Bird's beak animation*/
	var tl = new TimelineLite({ paused: true });
	var sk = 3;
	var tVar;

	var topBeak = $(".bubble-bird-top-beak"),
		bottomBeak = $(".bubble-bird-bottom-beak");

	tl.add([
		TweenMax.set([topBeak, bottomBeak], {
			css: {
				transformOrigin: "left 0",
				rotation: 0
			}
		})
	]);

	tl.add([
		TweenMax.to(topBeak, 0.2, {
			css: {
				rotation: -15
			},
			repeat: sk,
			ease: Power2.easeInOut
		}),
		TweenMax.to(bottomBeak, 0.2, {
			css: {
				rotation: 15
			},
			repeat: sk,
			ease: Power2.easeInOut
		})
	]);


	return tl;
}

var test1 = new bubbleBirdBeakAnimation();

$(document).ready(function () {
	$('.main-scene-container').find("img").eq(0).show();
	setSection();
	prepareImageMargins();
	initBGSwitch();
	initThumbnails();
	bubbleTextInit();
	//birdInit();
	//lampInit();
	tween_api.contacts.set();
	initLogoClick();
});

function initLogoClick() {
	$(document).on("click", "#contact-page-wrap .logo-container", function () {
		tween_api.contacts.open();
	});
	$(document).on("click", "#contact-page-wrap .content-container", function () {
		tween_api.contacts.close();
	});
}

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
			if (self.SecondVariant.progress() > 0.8 && self.SecondVariant.progress() < 0.82) {
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
			test1.play().eventCallback("onStart", function (something) {
				$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").fadeIn(200);
			}).eventCallback("onComplete", function () {
				test1.restart().pause();
			});
		}, 300);
	}).on("mouseleave", ".menu-hitbox", function () {
		var $ele = $(this);
		clearTimeout(comonTimer);
		$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").stop().fadeOut(100);
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