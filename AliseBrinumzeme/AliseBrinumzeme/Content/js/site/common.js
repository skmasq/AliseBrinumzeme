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


var SCENE = {
	//#region Doors
	Doors: {
		Base: $("#doors-wrap"),
		DoorKnob: $("#doorknob"),
		BubbleBird: {
			Base: $("#doors-wrap .bubble-bird-wrap"),
			Legs: $("#doors-wrap .bubble-bird-wrap .bubble-bird-legs"),
			Beak: {
				Top: $("#doors-wrap .bubble-bird-wrap .bubble-bird-top-beak"),
				Bottom: $("#doors-wrap .bubble-bird-wrap .bubble-bird-bottom-beak")
			}
		},
		Rabbit: {
			Base: $("#door-rabbit"),
			Head: $("#door-rabbit .rabbit-head"),
			Ears: {
				Left: $("#door-rabbit .lear-container"),
				Right: $("#door-rabbit .rear-container")
			}
		},
		BottomCup: {
			Base: $("#doorbottomleftcup-wrap"),
			Body: $("#doorbottomleftcup-wrap .cup-body"),
			Plate: {
				Front: $("#doorbottomleftcup-wrap .plate-front"),
				Back: $("#doorbottomleftcup-wrap .plate-back")
			}
		}
	},
	//#endregion
	//#region Table
	Table: {
		Base: $("#table-wrap"),
		TopLayer: {
			BirdCup: $("#table-wrap .cup-005"),
			PinkBird: $("#table-wrap .bird-003"),
			MovingCup: {
				Base: $("#table-wrap .cup-008"),
				Body: $("#table-wrap .cup-008 .cup-body"),
				Plate: {
					Front: $("#table-wrap .cup-008 .cup-front"),
					Back: $("#table-wrap .cup-008 .cup-back")
				}
			},
			BrownBirdCup: $("#table-wrap .cup-009")
		},
		BottomLayer: {
			TableRabbit: {
				Base: $("#table-rabbit-wrap"),
				Head: $("#table-rabbit-wrap .rabbit-head"),
				Ears: {
					Left: $("#table-rabbit-wrap .lear-container"),
					Right: $("#table-rabbit-wrap .rear-container")
				}
			},
			PiledCups: [
				$(".pile-of-cups .cup-001"),	// cup-001
				$(".pile-of-cups .cup-002"),	// cup-002
				$(".pile-of-cups .cup-003"),	// cup-003
				$(".pile-of-cups .cup-004"),	// cup-004
				$(".pile-of-cups .cup-006")		// cup-006
			]
		}
	},
	//#endregion
	//#region Lamp
	Lamp: {
		Base: $("#lamp")
	},
	//#endregion
	//#region Molbert
	Molbert: {
		Base: $("#molbert-wrap"),
		Rabbit: {
			Base: $(".molbert-rabbit-container"),
			Body: $(".molbert-rabbit-container .rabbit-body")
		}
	},
	//#endregion
	//#region Contact Page
	ContactPage: {
		Base: $("#contact-page-wrap")
	},
	//#endregion
	//#region General
	General: {
		BlueDove: {
			Base: $("#bird-with-key"),
			Body: $("#bird-with-key .bird-element"),
			String: $("#bird-with-key .string-container"),
			Key: $("#bird-with-key .key-element")
		},
		StartupLogo: {
			Base: $("#startup-logo")
		},
		WindowElement: {
			Base: $("#window-wrap"),
			Tags: {
				Phone: $("#window-wrap .phone-tag"),
				Mail: $("#window-wrap .mail-tag"),
				Location: $("#window-wrap .location-tag")
			}
		}
	}
	//#endregion
}

function test() {

}

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
		//#region doors
		doors: {
			base: {
				set: function () {
					/// <summary>
					/// Set Doors initial state
					/// </summary>
					TweenMax.set(SCENE.Doors.Base, { css: { bottom: -730 } });
				},
				instance: function () {
					/// <summary>
					/// Doors instance. Durtaion: 0.35s
					/// </summary>
					/// <returns type=""></returns>
					var tl = new TimelineMax({ paused: false });
					tl.add(TweenMax.to(SCENE.Doors.Base, 0.35, { css: { bottom: -45 }, ease: Cubic.easeIn }));
					return tl;
				}
			},
			bubblebird: {
				set: function () {
					TweenMax.set(SCENE.Doors.BubbleBird.Base, {
						css: {
							transformOrigin: "100% -200px",
							rotation: 30,
							top: -200,
							opacity: 0
						}
					});
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });
					//#region Frameset
					//#region Frame 1
					tl.add([
						TweenMax.to(SCENE.Doors.BubbleBird.Base, 0.1, { css: { opacity: 1 } }),
						TweenMax.to(SCENE.Doors.BubbleBird.Base, 0.4, { css: { top: -53, rotation: 0 } }),
						TweenMax.to(SCENE.Doors.BubbleBird.Legs, 0.2, { css: { height: 20 } })
					]);
					//#endregion
					//#region Frame 2
					tl.add(TweenMax.to(SCENE.Doors.BubbleBird.Legs, 0.2, { css: { height: 8 } }), 0.2);
					//#endregion
					//#region Frame 3
					tl.add([
						TweenMax.to(SCENE.Doors.BubbleBird.Base, 0.1, { css: { top: -56 } }),
						TweenMax.to(SCENE.Doors.BubbleBird.Legs, 0.1, { css: { height: 13 } })
					], 0.4);
					//#endregion
					//#endregion
					return tl;
				}
			},
			rabbitncup: {
				set: function () {
					TweenMax.set(SCENE.Doors.BottomCup.Base, { css: { transformOrigin: "57px 52px" } });
					TweenMax.set(SCENE.Doors.Rabbit.Base, { css: { bottom: 100, left: 70 } });
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false }),
						rabbitFrameLengths = [0.5],
						cupFrameLengths = [0.2, 0.2, 0.2, 0.15, 0.1, 0.1],
						cup_cont = SCENE.Doors.BottomCup.Base,
						cup_body = SCENE.Doors.BottomCup.Body,
						rabbit_cont = SCENE.Doors.Rabbit.Base;

					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(rabbit_cont, rabbitFrameLengths[0], { css: { bottom: 147, left: -58 }, ease: Back.easeOut }), 0)
					tl.add(TweenMax.to(cup_body, cupFrameLengths[0], { css: { rotation: 7 } }), getFrameLenght(cupFrameLengths, 0, 0.1));
					tl.add(TweenMax.to(cup_cont, cupFrameLengths[0], { css: { rotation: -10 } }), getFrameLenght(cupFrameLengths, 0, 0));
					//#endregion
					//#region Frame 2
					tl.add(TweenMax.to(cup_body, cupFrameLengths[1], { css: { rotation: -7 } }), getFrameLenght(cupFrameLengths, 1, 0.1));
					tl.add(TweenMax.to(cup_cont, cupFrameLengths[1], { css: { rotation: 6 } }), getFrameLenght(cupFrameLengths, 1, 0));
					//#endregion
					//#region Frame 3
					tl.add(TweenMax.to(cup_body, cupFrameLengths[2], { css: { rotation: 4 } }), getFrameLenght(cupFrameLengths, 2, 0.1));
					tl.add(TweenMax.to(cup_cont, cupFrameLengths[2], { css: { rotation: -5 } }), getFrameLenght(cupFrameLengths, 2, 0));
					//#endregion
					//#region Frame 4
					tl.add(TweenMax.to(cup_body, cupFrameLengths[3], { css: { rotation: -5 } }), getFrameLenght(cupFrameLengths, 3, 0.1));
					tl.add(TweenMax.to(cup_cont, cupFrameLengths[3], { css: { rotation: 3 } }), getFrameLenght(cupFrameLengths, 3, 0));
					//#endregion
					//#region Frame 5
					tl.add(TweenMax.to(cup_body, cupFrameLengths[4], { css: { rotation: -3 } }), getFrameLenght(cupFrameLengths, 4, 0.1));
					tl.add(TweenMax.to(cup_cont, cupFrameLengths[4], { css: { rotation: 0 } }), getFrameLenght(cupFrameLengths, 4, 0));
					//#endregion
					//#region Frame 6
					tl.add(TweenMax.to(cup_body, cupFrameLengths[5], { css: { rotation: 0 } }), getFrameLenght(cupFrameLengths, 5, 0));
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
		//#endregion
		//#region table
		table: {
			base: {
				set: function () {
					TweenMax.set(SCENE.Table.Base, { css: { right: -430 } });
				},
				instance: function () {
					/// <summary>
					/// Table instance. Duration: 0.25s
					/// </summary>
					/// <returns type=""></returns>
					var tl = new TimelineMax({ paused: false });
					tl.add(TweenMax.to(SCENE.Table.Base, 0.25, { css: { right: -130 }, ease: Cubic.easeIn }));
					return tl;
				}
			},
			rabbitnpile: {
				set: function () {
					var cup001 = SCENE.Table.BottomLayer.PiledCups[0],
						cup002 = SCENE.Table.BottomLayer.PiledCups[1],
						cup003 = SCENE.Table.BottomLayer.PiledCups[2],
						cup004 = SCENE.Table.BottomLayer.PiledCups[3],
						cup006 = SCENE.Table.BottomLayer.PiledCups[4],
						rabbit = SCENE.Table.BottomLayer.TableRabbit.Base;

					TweenMax.set([cup001, cup002, cup004, cup006], { css: { rotation: 0 } });
					TweenMax.set([cup004, cup006], { css: { transformOrigin: "bottom center" } });
					TweenMax.set(cup001, { css: { transformOrigin: "bottom right" } });
					TweenMax.set(cup002, { css: { transformOrigin: "bottom left" } });
					TweenMax.set(cup003, { css: { bottom: -15 } });
					TweenMax.set(rabbit, { css: { bottom: -150 } });

				},
				instance: function () {
					/// <summary>
					/// Rabbit'n'Pile instance. Duration 1.5s
					/// </summary>
					/// <returns type=""></returns>
					var tl = new TimelineMax({ paused: false });
					var tlFrameLength = [1.5];

					//#region Frameset
					//#region Frame 1
					tl.add([
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[0], tlFrameLength[0], { css: { rotation: -15 }, ease: Elastic.easeIn }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[1], tlFrameLength[0], { css: { rotation: 14 }, ease: Elastic.easeIn }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[2], tlFrameLength[0], { css: { bottom: -37 }, ease: Elastic.easeIn }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[3], tlFrameLength[0], { css: { rotation: -13 }, ease: Elastic.easeIn }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[4], tlFrameLength[0], { css: { rotation: 13 }, ease: Elastic.easeIn }),
						TweenMax.to(SCENE.Table.BottomLayer.TableRabbit.Base, tlFrameLength[0], { css: { bottom: -34 }, ease: Elastic.easeIn })
					], 0);
					//#endregion
					//#endregion
					return tl;
				}
			},
			pinkbird: {
				set: function () {
					TweenMax.set(SCENE.Table.TopLayer.PinkBird, {
						css: {
							rotation: -20,
							top: -160,
							left: 250,
							opacity: 0,
							transformOrigin: "top right"
						}
					})
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });
					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(SCENE.Table.TopLayer.PinkBird, 0.5, { css: { rotation: 0, top: -125, left: 225, opacity: 1 } }), 0);
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
		//#endregion
		//#region lamp
		lamp: {
			base: {
				set: function () {
					TweenMax.set(SCENE.Lamp.Base, { css: { top: -300 } });
				},
				instance: function () {
					/// <summary>
					/// Lamp instance. Duration: 0.75s
					/// </summary>
					/// <returns type=""></returns>
					var tl = new TimelineMax({ paused: false });
					tl.add(TweenMax.to(SCENE.Lamp.Base, 0.75, { css: { top: -30 }, ease: Bounce.easeOut }));
					return tl;
				}
			}
		},
		//#endregion
		//#region molbert
		molbert: {
			base: {
				set: function () {
					TweenMax.set(SCENE.Molbert.Base, { css: { bottom: -463 } });
					TweenMax.set(SCENE.ContactPage.Base, { css: { bottom: -350 } });
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });

					//#region Frameset
					//#region Frame1
					tl.add([
						TweenMax.to(SCENE.Molbert.Base, 0.15, { css: { bottom: -13 } }),
						TweenMax.to(SCENE.ContactPage.Base, 0.15, { css: { bottom: 100 } })
					], 0);
					//#endregion
					//#endregion
					return tl;
				}
			},
			molbertrabbit: {
				set: function () {
					TweenMax.set(SCENE.Molbert.Rabbit.Body, { css: { bottom: -23 } })
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });
					//#region Frameset
					//#region Frame1
					tl.add(TweenMax.to(SCENE.Molbert.Rabbit.Body, 0.5, { css: { bottom: 45 }, ease: Cubic.easeIn }));
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
		//#endregion
		//#region global
		global: {
			bluedove: {
				base: {
					set: function () {
						TweenMax.set(SCENE.General.BlueDove.Base, { css: { right: 0 } });
					},
					instance: function () {
						var tl = new TimelineMax({ paused: false });
						//#region Frameset
						//#region Frame 1
						tl.add(TweenMax.to(SCENE.General.BlueDove.Base, 0.5, { css: { right: 100 } }));
						//#endregion
						//#endregion
						return tl;
					}
				}
			},
			startuplogo: {
				set: function () {
					TweenMax.set(SCENE.General.StartupLogo.Base, { css: { display: "block" } });
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });
					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(SCENE.General.StartupLogo.Base, 3, { css: { opacity: 0 } }));
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
		//#endregion
	},
	contacts: {
		set: function () {
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
			}), 0);

			contact_page.find(".logo-container").eq(0).fadeOut(100, "linear", function () {
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
	},
	table: {
		movingcup: {
			set: function () {
				TweenMax.set([
					SCENE.Table.TopLayer.MovingCup.Base,
					SCENE.Table.TopLayer.MovingCup.Body
				], { css: { transformOrigin: "bottom center", rotation: 0 } });
			},
			instance: function () {
				var tl = new TimelineMax({ paused: false, repeat: -1, yoyo: true });
				//#region Frameset
				//#region Frame 1
				tl.add([
					TweenMax.to(SCENE.Table.TopLayer.MovingCup.Base, 2, { css: { rotation: -8 } }),
					TweenMax.to(SCENE.Table.TopLayer.MovingCup.Body, 2, { css: { rotation: 7 } })
				], 0);
				//#endregion
				//#endregion
				return tl;
			}
		}
	},
	global: {
		bluedove: {
			keyswing: {
				set: function () {
					TweenMax.set(SCENE.General.BlueDove.String, { transformOrigin: "center top", rotationZ: 15 });
					TweenMax.set(SCENE.General.BlueDove.Key, { transformOrigin: "center top", rotationZ: 5 });
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false, yoyo: true, repeat: -1, repeatDelay: 0.2 });
					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(SCENE.General.BlueDove.String, 2, { css: { rotationZ: -15 }, ease: Quad.easeInOut }), 0);
					tl.add(TweenMax.to(SCENE.General.BlueDove.Key, 2, { css: { rotationZ: -10 }, ease: Quad.easeInOut }), 0.5);
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
		lamp: {
			swing: {
				set: function () {
					TweenMax.set(SCENE.Lamp.Base, { css: { transformOrigin: "center top" } })
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });

					var swingLampLeft = function () {
						TweenMax.to(SCENE.Lamp.Base, 4, {
							rotation: 10,
							ease: Power2.easeInOut,
							onComplete: swingLampRight
						});
					};

					var swingLampRight = function () {
						TweenMax.to(SCENE.Lamp.Base, 4, {
							rotation: -10,
							ease: Power2.easeInOut,
							onComplete: swingLampLeft
						});
					};

					tl.add(swingLampLeft);

					return tl;
				}
			}
		},
		tags: {
			swing: {
				set: function(){
					TweenMax.set([
						SCENE.General.WindowElement.Tags.Phone,
						SCENE.General.WindowElement.Tags.Mail,
						SCENE.General.WindowElement.Tags.Location
					], { css: { transformPerspective: 300 } });
				},
				instance: function () {
					var tl = new TimelineMax({repeat: -1, yoyo: true});
					tl.add([
						TweenMax.to(SCENE.General.WindowElement.Tags.Phone, 2, { css: { rotationY: 20 } }),
						TweenMax.to(SCENE.General.WindowElement.Tags.Mail, 1, { css: { rotationY: -30 } }),
						TweenMax.to(SCENE.General.WindowElement.Tags.Location, 3, { css: { rotationY: 40 } })
					]);

					tl.add([
						TweenMax.to(SCENE.General.WindowElement.Tags.Phone, 2, { css: { rotationY: -35 } }),
						TweenMax.to(SCENE.General.WindowElement.Tags.Mail, 3, { css: { rotationY: 15 } }),
						TweenMax.to(SCENE.General.WindowElement.Tags.Location, 1, { css: { rotationY: -25 } })
					]);
					return tl;
				}
			}
		}
	}
};


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

function initStartPage() {

	//#region Put all sets here
	//tween_api.start.global.startuplogo.set();
	tween_api.start.doors.base.set();
	tween_api.start.doors.bubblebird.set();
	tween_api.start.doors.rabbitncup.set();
	tween_api.global.lamp.swing.set();
	tween_api.start.lamp.base.set();
	tween_api.start.molbert.base.set();
	tween_api.start.molbert.molbertrabbit.set();
	tween_api.start.table.base.set();
	tween_api.table.movingcup.set();
	tween_api.start.table.pinkbird.set();
	tween_api.start.table.rabbitnpile.set();
	tween_api.global.bluedove.keyswing.set();
	tween_api.start.global.bluedove.base.set();
	//#endregion

	var tl = new TimelineMax({
		delay: 1
	});

	tl
		.add(tween_api.start.doors.base.instance(), "start")
		.add(tween_api.start.doors.rabbitncup.instance(), "bottomrabitcup")
		.add(tween_api.start.doors.bubblebird.instance(), "bottomrabitcup+=0.25")
		.add(tween_api.start.table.base.instance(), "bottomrabitcup+=0.25")
		.add(tween_api.start.table.rabbitnpile.instance(), "rabbitnpile")
		.addCallback(tween_api.table.movingcup.instance)
		.add(tween_api.start.table.pinkbird.instance(), "rabbitnpile+=0.5")
		//.add(tween_api.start.global.startuplogo.instance(), "bottomrabitcup+=0.25")
		.add(tween_api.start.lamp.base.instance(), "bottomrabitcup+=0.5")
		.addCallback(tween_api.global.lamp.swing.instance, "bottomrabitcup+=1")
		.add(tween_api.start.molbert.base.instance(), "bottomrabitcup+=0.75")
		.add(tween_api.start.global.bluedove.base.instance(), "bottomrabitcup+=0.95")
		.addCallback(tween_api.global.bluedove.keyswing.instance, "bottomrabitcup+=1.45")
		.add(tween_api.start.molbert.molbertrabbit.instance(), "bottomrabitcup+=1.25")
		.addCallback(function () {
			$("#section-wrap").show();
			$(".empty-bubble").fadeIn();
			$(".bubble-text-content").fadeIn();
			setTimeout(function () {
				test1.play().eventCallback("onStart", function (something) {
					$(".empty-bubble").fadeIn(200);
					$(".bubble-text-content").fadeIn(200);
				}).eventCallback("onComplete", function () {
					test1.restart().pause();
				});
			}, 2000);
		});
}

$(document).ready(function () {
	$('.main-scene-container').find("img").eq(0).show();
	setSection();
	prepareImageMargins();
	initBGSwitch();
	initThumbnails();
	bubbleTextInit();
	tween_api.contacts.set();
	initStartPage();
	//$("#section-wrap").show();
	initLogoClick();
	// window
	tween_api.global.tags.swing.set();
	tween_api.global.tags.swing.instance();
});

function initLogoClick() {
	$(document).on("click", "#contact-page-wrap .logo-container", tween_api.contacts.open);
	$(document).on("click", "#contact-page-wrap .content-container", tween_api.contacts.close);
	$(document).on("click", ".floating-tag", tween_api.contacts.open);
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
	});
}

function openSection() {
	var self = this;
	self.__ele_imagebg = $("#section-wrap")

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

	self.SecondVariant = new TimelineMax({
		paused: true,
		onComplete: function () {
			self.__ele_imagebg.find(".section-content-wrap").eq(0).fadeIn();
		}
	});
	
	
	self.SecondVariant.add(TweenMax.set($(".overlaping-blur"), {
		css: {
			alpha: 0,
			visibility: "visible"
		}
	}), 0);

	self.SecondVariant.add(TweenMax.to($(".overlaping-blur"), 0.5, { css: { alpha: 1 } }),0.5);

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

	var prevImage = $(this);

	$("#section-wrap .thumbnail-image-container").each(function () {
		var hoverTL = new tween_api.sections.thumbnails.hover($(this));
		$(this).data("hover_tween", hoverTL);
	});

	$(document).on("mouseenter", ".thumbnail-image-container", function () {
		$(this).data("hover_tween").play();
	}).on("mouseleave", ".thumbnail-image-container", function () {
		$(this).data("hover_tween").reverse();
	});

	//Makes clicked thumbnail less visiable
	$(document).on("click", ".thumbnail-image", function () {
		$(this).css("opacity", ".7");

		if (prevImage.attr("src") != $(this).attr("src")) {
			prevImage.css("opacity", "1");
		}
		prevImage = $(this);
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