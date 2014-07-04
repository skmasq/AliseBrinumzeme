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


var _S = {
	Body: {
		Window: {
			base: $("#window-wrap"),
			Tags: {
				Phone: $("#window-wrap .phone-tag"),
				Mail: $("#window-wrap .mail-tag"),
				Location: $("#window-wrap .location-tag")
			}
		},
		Table: {
			base: $("#table-wrap"),
			Top: {
				PinkBird: {
					Body: $("#table-wrap .bird-003"),
					Cup: $("#table-wrap .cup-005"),
				},
				FallingCup: {
					Base: $("#table-wrap .cup-008"),
					Body: $("#table-wrap .cup-008 .cup-body"),
					Plate: {
						Front: $("#table-wrap .cup-008 .cup-front"),
						Back: $("#table-wrap .cup-008 .cup-back")
					}
				}
			},
			Bottom: {
				Rabbit: {
					base: $("#table-rabbit-wrap"),
					Head: $("#table-rabbit-wrap .rabbit-head"),
					Ears: {
						Left: $("#table-rabbit-wrap .lear-container"),
						Right: $("#table-rabbit-wrap .rear-container")
					}
				},
				PiledCups: {
					Left: {
						Front: $("#table-wrap .pile-of-cups .cup-004"),
						Back: $("#table-wrap .pile-of-cups .cup-001")
					},
					Center: {
						Back: $("#table-wrap .pile-of-cups .cup-003")
					},
					Right: {
						Front: $("#table-wrap .pile-of-cups .cup-006"),
						Back: $("#table-wrap .pile-of-cups .cup-002")
					}
				}
			}
		},
		BlueDove: {
			base: $("#bird-with-key"),
			Body: $("#bird-with-key .bird-element"),
			String: $("#bird-with-key .string-container"),
			Key: $("#bird-with-key .key-element")
		},
		BGBlur: {
			OverlapingBlur: $(".overlaping-blur"),

		}
	},
	Container: {
		Lamp: {
			base: $("#lamp")
		},
		Molbert: {
			base: $("#molbert-wrap"),
			Rabbit: {
				base: $("#molbert-wrap .molbert-rabbit-container"),
				Body: $("#molbert-wrap .molbert-rabbit-container .rabbit-body")
			}
		},
		Doors: {
			base: $("#doors-wrap"),
			DoorKnob: $("#doorknob"),
			Bird: {
				base: $("#doors-wrap .bubble-bird-wrap"),
				Legs: $("#doors-wrap .bubble-bird-wrap .bubble-bird-legs"),
				Beak: {
					Top: $("#doors-wrap .bubble-bird-wrap .bubble-bird-top-beak"),
					Bottom: $("#doors-wrap .bubble-bird-wrap .bubble-bird-bottom-beak")
				}
			},
			Rabbit: {
				base: $("#door-rabbit"),
				Head: $("#door-rabbit .rabbit-head"),
				Ears: {
					Left: $("#door-rabbit .lear-container"),
					Right: $("#door-rabbit .rear-container")
				},
				Cup: {
					base: $("#doorbottomleftcup-wrap"),
					Body: $("#doorbottomleftcup-wrap .cup-body"),
					Plate: {
						Front: $("#doorbottomleftcup-wrap .plate-front"),
						Back: $("#doorbottomleftcup-wrap .plate-back")
					}
				}
			}
		},
		Shelve: {
			base: $("#shelve-wrap"),
			Mail: {
				base: $(".mail-swing-wrap"),
				Body: $(".mail-swing-wrap .mail-body")
			},
			Phone: {
				base: $(".phone-ring-wrap"),
				Body: $(".phone-ring-wrap .phone-body"),
				Ringer: $(".phone-ring-wrap .phone-ringer")
			}
		},
		Section: {
			base: $("#section-wrap"),
			Description: {
				base: $(".section-description-wrap")
			},
			Thumbnails: {
				all: $(".thumbnail-image")
			},
			MainScene: {
				base: $(".main-scene-wrap")
			},
			InfoBook: $(".info-book-wrap")
		},
		Contacts: {
			base: $("#contact-page-wrap"),
			Logo: {
				base: $("#contact-page-wrap .logo-container")
			}
		}
	}
}

var SCENE = {
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
	Lamp: {
		Base: $("#lamp")
	},
	Molbert: {
		Base: $("#molbert-wrap"),
		Rabbit: {
			Base: $(".molbert-rabbit-container"),
			Body: $(".molbert-rabbit-container .rabbit-body")
		}
	},
	ContactPage: {
		Base: $("#contact-page-wrap")
	},
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
}

var SectionObject = new sectionControler();

var catureScreenshot = _.once(function () {
	html2canvas($("#viewport"), {
		background: "#000",
		onrendered: function (canvas) {
			$(".overlaping-blur").show();
			$("#canvas-container").append(canvas);
			$(canvas).attr("id", "canvas");
			setTimeout(function () {
				stackBlurCanvasRGB(
									'canvas',
								0,
								0,
								$("#canvas").width(),
								$("#canvas").height(), 7);
			}, 0);
		}
	});
});

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
			},
			switchTo: {
				right: function () {
					var tl = new TimelineMax();

					tl.add(TweenMax.staggerTo(_S.Container.Section.Thumbnails.all, 0.2, { scale: 0 }, 0.05));

					tl.add(TweenMax.staggerTo(_S.Container.Section.Thumbnails.all, 0.2, { scale: 1 }, 0.05), 0.3);

					return tl;
				},
				left: function () {
					var tl = new TimelineMax();

					tl.add(TweenMax.staggerTo(_S.Container.Section.Thumbnails.all.get().reverse(), 0.2, { scale: 0 }, 0.05));

					tl.add(TweenMax.staggerTo(_S.Container.Section.Thumbnails.all.get().reverse(), 0.2, { scale: 1 }, 0.05), 0.3);

					return tl;
				}
			}
		},
		description: {
			hide: function () {
				var tl = new TimelineMax();

				tl.add([
					TweenMax.set(_S.Container.Section.MainScene.base, { css: { visibility: "visible", alpha: 0 } }),
					TweenMax.set(_S.Container.Section.InfoBook, { css: { display: "block", alpha: 0 } })
				]);

				tl.add([
					TweenMax.to(_S.Container.Section.Description.base, 0.5, {
						css: {
							transformOrigin: "center top",
							rotationZ: 35,
							rotationX: 80,
							x: -150,
							y: 0,
							scaleX: 0.2,
							scaleY: 0.5,
							opacity: 0
						}
					}),
					TweenMax.to(_S.Container.Section.MainScene.base, 0.5, { css: { alpha: 1 } })
				]);

				tl.add(TweenMax.to(_S.Container.Section.InfoBook, 0.2, { css: { alpha: 1 } }), 0.3);

				tl.add(function () {
					_S.Container.Section.Description.base.hide();
				});

				return tl;
			},
			show: function () {
				var tl = new TimelineMax();

				tl.add(function () {
					_S.Container.Section.Description.base.show();
					$(".info-toggle").text("Info");
				});

				tl.add(
				TweenMax.to([
					$(".thumbnail-scene-container"),
					$(".thumbnail-scene-wrap .arrow")
				], 0.3, { css: { alpha: 1, rotationX: 0, rotationY: 0, scale: 1 } }),0)

				tl.add(function () {
					$(".picture-info").fadeOut(100);
				},0)

				tl.add([
					TweenMax.to(_S.Container.Section.InfoBook, 0.1, { css: { alpha: 0 } }),
					TweenMax.to(_S.Container.Section.Description.base, 0.5, {
						css: {
							transformOrigin: "center top",
							rotationZ: 0,
							rotationX: 0,
							x: 0,
							y: 0,
							scaleX: 1,
							scaleY: 1,
							opacity: 1
						}
					}),
					TweenMax.to(_S.Container.Section.MainScene.base, 0.5, { css: { alpha: 0 } })
				],0);

				tl.set(_S.Container.Section.MainScene.base, { css: { visibility: "hidden", alpha: 1 } }, 0.5);
				tl.set(_S.Container.Section.InfoBook, { css: { display: "none", alpha: 1 } }, 0.5);

				return tl;
			}
		}
	},
	start: {
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
				},
				hide: function () {
					var tl = new TimelineMax(),
						rabbitFrameLengths = [0.5],
						cupFrameLengths = [0.2, 0.2, 0.2, 0.15, 0.1, 0.1],
						cup_cont = _S.Container.Doors.Rabbit.Cup.base,
						cup_body = _S.Container.Doors.Rabbit.Cup.Body,
						rabbit_cont = _S.Container.Doors.Rabbit.base;
					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(rabbit_cont, rabbitFrameLengths[0], { css: { bottom: 100, left: 70 } }), 0)
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
				},
				hide: function () {
					/// <summary>
					/// Rabbit'n'Pile instance. Duration 1.5s
					/// </summary>
					/// <returns type=""></returns>
					var tl = new TimelineMax({ paused: false });
					var tlFrameLength = [1.5];

					//#region Frameset
					//#region Frame 1
					tl.add([
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[0], tlFrameLength[0], { css: { rotation: 0 }, ease: Elastic.easeOut }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[1], tlFrameLength[0], { css: { rotation: 0 }, ease: Elastic.easeOut }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[2], tlFrameLength[0], { css: { bottom: -15 }, ease: Elastic.easeOut }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[3], tlFrameLength[0], { css: { rotation: 0 }, ease: Elastic.easeOut }),
						TweenMax.to(SCENE.Table.BottomLayer.PiledCups[4], tlFrameLength[0], { css: { rotation: 0 }, ease: Elastic.easeOut }),
						TweenMax.to(SCENE.Table.BottomLayer.TableRabbit.Base, tlFrameLength[0], { css: { bottom: -150 }, ease: Elastic.easeOut })
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
				},
				pickfood: function () {
					var tl = new TimelineMax();

					tl.set(_S.Body.Table.Top.PinkBird.Body, { css: { rotation: 0, transformOrigin: "bottom center" } });
					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(_S.Body.Table.Top.PinkBird.Body, 0.2, { css: { rotation: -25 } }), 0);
					tl.add(TweenMax.to(_S.Body.Table.Top.PinkBird.Body, 0.1, { css: { rotation: -15 } }));
					tl.add(TweenMax.to(_S.Body.Table.Top.PinkBird.Body, 0.1, { css: { rotation: -25 } }));
					tl.add(TweenMax.to(_S.Body.Table.Top.PinkBird.Body, 0.2, { css: { rotation: 0 } }));
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
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
				},
				hide: function () {
					var tl = new TimelineMax();
					//#region Frameset
					//#region Frame1
					tl.add(TweenMax.to(_S.Container.Molbert.Rabbit.Body, 0.5, { css: { bottom: -23 }, ease: Cubic.easeOut }));
					//#endregion
					//#endregion
					return tl;
				}
			}
		},
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
					},
					hide: function () {
						var tl = new TimelineMax();
						//#region Frameset
						//#region Frame 1
						tl.add([
							TweenMax.to(_S.Body.BlueDove.base, 1, { css: { right: "-=100px" } }),
							TweenMax.to(_S.Body.BlueDove.Key, 1, { css: { left: "-=100px", bottom: -600, alpha: 0 } })
						]);
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
					animateCursor();

				}
			});

			tl.set(_S.Body.BGBlur.OverlapingBlur, { css: { alpha: 0, visibility: "visible", display: "block" } }, 0)
			tl.add(TweenMax.to(contact_page, 1, {
				css: {
					rotation: 0,
					bottom: "50%",
					height: 740,
					width: 498,
					marginBottom: -370,
					marginLeft: -249
				}
			}), 0)
			tl.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 1 } }, 0.5);

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

			tl.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 0 } }, 0)
			tl.add(TweenMax.to(contact_page, 1, {
				css: {
					rotation: 93,
					bottom: 100,
					height: 225,
					width: 151,
					marginBottom: 0,
					marginLeft: 49
				}
			}), 0)
			tl.set(_S.Body.BGBlur.OverlapingBlur, { css: { visibility: "hidden", display: "none" } }, 1);
			

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
			},
			drop: function () {
				var tl = new TimelineMax();
				//#region Frameset
				//#region Frame 1
				tl.add([
					TweenMax.to(_S.Body.Table.Top.FallingCup.Base, 1, { css: { left: -100, top: 250, rotation: -67 }, ease: Power4.easeInOut }),
					TweenMax.to(_S.Body.Table.Top.FallingCup.Body, 1, { css: { top: -26, rotation: 51 }, ease: Power4.easeInOut })
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
				},
				drop: function () {
					var tl = new TimelineMax();
					//#region Frameset
					//#region Frame 1
					tl.add(TweenMax.to(_S.Body.BlueDove.base, 2, { css: { rotationZ: 0 }, ease: Quad.easeInOut }), 0);
					tl.add(TweenMax.to(_S.Body.BlueDove.Key, 2, { css: { rotationZ: 0 }, ease: Quad.easeInOut }), 0.5);
					//#endregion

					//#region Frame 2
					tl.add([
							TweenMax.to(_S.Body.BlueDove.base, 1.5, { css: { right: "-=100px" } }),
							TweenMax.to(_S.Body.BlueDove.Key, 1.5, { css: { left: "-=100px", bottom: -700, alpha: 0 } })
					]);
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
		phone: {
			ring: {
				set: function () {
					TweenMax.set([
						_S.Container.Shelve.Phone.Body,
						_S.Container.Shelve.Phone.Ringer
					], { css: { transformOrigin: "bottom center" } });
				},
				instance: function () {
					var tl = new TimelineMax();

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: 4 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: -3 } })
					]);

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: -4 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: 2 } })
					]);

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: 5 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: -1 } })
					]);

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: 1 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: -4 } })
					]);

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: -3 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: 3 } })
					]);

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: 2 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: -4 } })
					]);

					tl.add([
						TweenMax.to(_S.Container.Shelve.Phone.Body, 0.05, { css: { rotation: 0 } }),
						TweenMax.to(_S.Container.Shelve.Phone.Ringer, 0.05, { css: { rotation: 0 } })
					]);

					return tl;
				}
			}
		},
		mail: {
			swing: {
				set: function () {
					TweenMax.set(_S.Container.Shelve.Mail.Body, { css: { transformOrigin: "20px 10px" } })
				},
				instance: function () {
					var tl = new TimelineMax({ paused: false });

					var swingMailLeft = function () {
						TweenMax.to(_S.Container.Shelve.Mail.Body, 4, {
							rotation: 12,
							ease: Power2.easeInOut,
							onComplete: swingMailRight
						});
					};

					var swingMailRight = function () {
						TweenMax.to(_S.Container.Shelve.Mail.Body, 4, {
							rotation: -10,
							ease: Power2.easeInOut,
							onComplete: swingMailLeft
						});
					};

					tl.add(swingMailLeft);

					return tl;
				}
			}
		},
		tags: {
			swing: {
				set: function () {
					TweenMax.set([
						SCENE.General.WindowElement.Tags.Phone,
						SCENE.General.WindowElement.Tags.Mail,
						SCENE.General.WindowElement.Tags.Location
					], { css: { transformPerspective: 300 } });
				},
				instance: function () {
					var tl = new TimelineMax({ repeat: -1, yoyo: true });
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
	tween_api.global.mail.swing.set();
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
		// Labels delegation
		.addLabel("ACT_I", 0)
		.addLabel("lampdrop", 0)
		.addLabel("table", 0.5)
		.addLabel("doors", 0.75)
		.addLabel("molbert", 1.5)
		.addLabel("bluedove", "molbert+=0.5")
		.addLabel("bubblebird", "bluedove+=0.25")
		//.addLabel("ACT_II", "bubblebird+=1.5")
		.addLabel("ACT_II", "ACT_I+=10")
		.addLabel("keydrop", "ACT_II")
		.addLabel("cupdrop", "keydrop+=3")
		.addLabel("animalsHide", "cupdrop+=0.6")
		.addLabel("ACT_III", "animalsHide+=1.7")
		.addLabel("animalsShow", "ACT_III")

		// ACT I
		.add(tween_api.start.lamp.base.instance(), "lampdrop")
		.addCallback(tween_api.global.lamp.swing.instance, "lampdrop+=0.5")
		.add(tween_api.start.table.base.instance(), "table")
		.add(tween_api.start.table.rabbitnpile.instance(), "table+=0.5")
		.add(tween_api.start.doors.base.instance(), "doors")
		.add(tween_api.start.doors.rabbitncup.instance(), "doors+=0.5")
		.addCallback(function () {
			$("#section-wrap").show();
		}, "doors+=1")
		.addCallback(function () {
			$("#shelve-wrap").fadeIn(function () {
				tween_api.global.mail.swing.instance();
				setTimeout(phoneRingInit, 1500);
			});
			$("#window-wrap").fadeIn();
		}, "doors")
		.add(tween_api.start.molbert.base.instance(), "molbert")
		.add(tween_api.start.molbert.molbertrabbit.instance(), "molbert+=0.25")
		.add(tween_api.start.global.bluedove.base.instance(), "bluedove")
		.addCallback(tween_api.global.bluedove.keyswing.instance, "bluedove+=0.25")
		.add(tween_api.start.doors.bubblebird.instance(), "bubblebird")
		.addCallback(function () {
			test1.play().eventCallback("onStart", function (something) {
				$(".empty-bubble").fadeIn(200);
				$(".bubble-text-content.start").fadeIn(200);

				setTimeout(function () {
					$(".empty-bubble").fadeOut(300);
					$(".bubble-text-content.start").fadeOut(300);
				}, 4000);
			}).eventCallback("onComplete", function () {
				test1.restart().pause();
			});
		}, "bubblebird+=0.5")
		.add(tween_api.start.table.pinkbird.instance(), "bubblebird+=0.75")
		.add(tween_api.table.movingcup.instance(), "bubblebird+=1")
		.addCallback(function () {
			catureScreenshot();
			pickFoodInit();
			doorKnobDemo();
			doorRabbitEars();
			setTimeout(tableRabbitEars, 3000);
		}, "bubblebird+=1.5")

		// ACT II
		.add(tween_api.global.bluedove.keyswing.drop(), "keydrop")
		.add(tween_api.table.movingcup.drop(), "cupdrop")
		.add(tween_api.start.table.rabbitnpile.hide(), "animalsHide")
		.add(tween_api.start.molbert.molbertrabbit.hide(), "animalsHide+=0.15")
		.add(tween_api.start.doors.rabbitncup.hide(), "animalsHide+=0.4")

		// ACT III
		.add(tween_api.start.doors.rabbitncup.instance(), "animalsShow")
		.add(tween_api.start.table.rabbitnpile.instance(), "animalsShow+=0.5")
		.add(tween_api.start.molbert.molbertrabbit.instance(), "animalsShow+=2")

};

$(document).ready(function () {
	setWelcomeMessage();
	$("#shelve-wrap").hide();
	$("#window-wrap").hide();
	bootstarter();
	prepareImageMargins();
	initBGSwitch();
	initThumbnails();
	bubbleTextInit();
	tween_api.contacts.set();
	initStartPage();
	initLogoClick();

	function initialize() {
		var myLatlng = new google.maps.LatLng(56.957788, 24.065033);
		var mapOptions = {
			zoom: 15,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map($("#canvas-mapps").get(0),
			mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Hello World!'
		});
	}
	initialize();
});

function doorKnobDemo() {

	var self = this;

	self.Playing = false;

	self.StartPosition = 0;
	self.EndPosition = 180;

	self.RotationMatrix = [[
		self.StartPosition + 30,
		self.StartPosition,
		self.StartPosition + 30,
		self.StartPosition,
		self.EndPosition
	], [
		self.EndPosition - 30,
		self.EndPosition,
		self.EndPosition - 30,
		self.EndPosition,
		self.StartPosition
	]];

	self.CurrSequence = 0;

	self.AnimationReversed = false;

	self.animationForward = new TimelineMax({
		onComplete: function () {
			self.AnimationReversed = true;
			setTimeout(function () {
				self.animationBackward.pause().restart().play();
			}.bind(this), 5000);
		}
	});

	self.animationBackward = new TimelineMax({
		paused: true,
		onComplete: function () {
			self.AnimationReversed = false;
			setTimeout(function () {
				self.animationForward.pause().restart().play();
			}.bind(this), 5000);
		}
	});

	self.__ele_doorknob = $("#doorknob")[0];

	self.animationForward.add(
		[
			TweenMax.to(self.__ele_doorknob, 0.15, {
				rotation: self.RotationMatrix[0][0],
				ease: "Back.easeOut"
			}),
			TweenMax.to(self.__ele_doorknob, 0.15, {
				rotation: self.RotationMatrix[0][1]
			}),
			TweenMax.to(self.__ele_doorknob, 0.35, {
				rotation: self.RotationMatrix[0][2]
			}),
			TweenMax.to(self.__ele_doorknob, 0.15, {
				rotation: self.RotationMatrix[0][3]
			}),
			TweenMax.to(self.__ele_doorknob, 0.80, {
				rotation: self.RotationMatrix[0][4]
			})
		], 0, "sequence");

	self.animationBackward.add(
		[
			TweenMax.to(self.__ele_doorknob, 0.25, {
				rotation: self.RotationMatrix[1][0],
				ease: "Back.easeOut"
			}),
			TweenMax.to(self.__ele_doorknob, 0.25, {
				rotation: self.RotationMatrix[1][1]
			}),
			TweenMax.to(self.__ele_doorknob, 0.25, {
				rotation: self.RotationMatrix[1][2]
			}),
			TweenMax.to(self.__ele_doorknob, 0.25, {
				rotation: self.RotationMatrix[1][3]
			}),
			TweenMax.to(self.__ele_doorknob, 0.35, {
				rotation: self.RotationMatrix[1][4]
			})
		], 0, "sequence");
}

function doorRabbitEars() {

	/* Bird's beak animation*/
	var tl = new TimelineMax({repeat: -1, repeatDelay: 5, delay: 3.5});
	var sk = 3;
	var tVar;

	var left_ear = $("#doors-wrap .lear-container"),
		right_ear = $("#doors-wrap .rear-container");

	var left_pos = [-5, 2],
		right_pos = [5, -5]

	tl.set(left_ear, {
		css: {
			transformOrigin: "right bottom",
			rotation: 0
		}
	}, 0).set(right_ear, {
		css: {
			transformOrigin: "left bottom",
			rotation: 0
		}
	}, 0);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: left_pos[0] }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: right_pos[0] }
	})], 0.1);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: left_pos[1] }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: right_pos[1] }
	})]);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: left_pos[0] }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: right_pos[0] }
	})]);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: 0 }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: 0 }
	})]);
}

function tableRabbitEars() {

	/* Bird's beak animation*/
	var tl = new TimelineMax({ repeat: -1, repeatDelay: 5, delay: 2 });
	var sk = 3;
	var tVar;



	var left_ear = $("#table-wrap .lear-container"),
		right_ear = $("#table-wrap .rear-container");

	var left_pos = [-5, 2],
		right_pos = [5, -5]

	tl.set(left_ear, {
		css: {
			transformOrigin: "right bottom",
			rotation: 0
		}
	}, 0).set(right_ear, {
		css: {
			transformOrigin: "left bottom",
			rotation: 0
		}
	}, 0);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: left_pos[0] }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: right_pos[0] }
	})], 0.1);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: left_pos[1] }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: right_pos[1] }
	})]);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: left_pos[0] }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: right_pos[0] }
	})]);

	tl.add([TweenMax.to(left_ear, 0.25, {
		css: { rotation: 0 }
	}),
	TweenMax.to(right_ear, 0.25, {
		css: { rotation: 0 }
	})]);
}

function pickFoodInit() {
	var pikcFood = function () {
		tween_api.start.table.pinkbird.pickfood().eventCallback("onComplete", function () {
			setTimeout(pikcFood, 8000);
		});
	}

	pikcFood();
}

function phoneRingInit() {
	tween_api.global.phone.ring.set();

	var phoneRing = function () {
		tween_api.global.phone.ring.instance().eventCallback("onComplete", function () {
			setTimeout(function () {
				tween_api.global.phone.ring.instance().eventCallback("onComplete", function () {
					setTimeout(phoneRing, 3000);
				})
			}, 300);
		})
	}

	phoneRing();
}

function setWelcomeMessage() {
	var welcomeMessage = "...Labrīt!";
	var cssStyle = "";

	var Digital = new Date();
	var hours = Digital.getHours();

	if (hours > 17 || hours <= 3) {
		welcomeMessage = "...Labvakar!";
		cssStyle = "evening";
	} else if (hours > 12 && hours <= 17) {
		welcomeMessage = "...Labdien!";
		cssStyle = "day";
	}
	else {
		welcomeMessage = "...Labrīt!";
		cssStyle = "morning";
	}

	$(".bubble-text-content.start").text(welcomeMessage).addClass(cssStyle);
}

function bootstarter() {
	eventhandler();
}

function eventhandler() {
	var test234 = _.debounce(function (e) {
		console.log(e);
	}, 200);
	var rabbitTO;
	var infoToggled = false;

	$(document)
		.on("mouseenter", ".shelve-container", function () {
			$(".shelve-hover-state").stop().fadeIn()
		})
		.on("mouseleave", ".shelve-container", function () {
			$(".shelve-hover-state").stop().fadeOut()
		})
		.on("click", ".shelve-container", tween_api.contacts.open)
		.on("click", ".info-book-wrap", tween_api.sections.description.show)
		.on("click", ".thumbs-left-click", tween_api.sections.thumbnails.switchTo.left)
		.on("click", ".thumbs-right-click", tween_api.sections.thumbnails.switchTo.right)
		.on("click", ".menu-hitbox", function () {
			console.log($(this).data("menutextindex"));
			if ($(this).data("menutextindex") != "6")
				SectionObject.open();
			else
				tween_api.contacts.open();
		})
		.on("click", ".overlap-taint", function () {
			SectionObject.close();
			tween_api.contacts.close();
		})
		.on("click", ".close-button", function () {
			SectionObject.close()
		})
		.on("click", ".close-button-contacts", tween_api.contacts.close)
		.on("click", ".info-toggle", function () {
			if (infoToggled) {
				$(this).text("Info");
				TweenMax.to([
					$(".thumbnail-scene-container"),
					$(".thumbnail-scene-wrap .arrow")
				], 0.3, { css: { alpha: 1, rotationX: 0, rotationY: 0, scale: 1 } }).eventCallback("onStart", function () {
					$(".picture-info").fadeOut(100);
				});
			} else {
				$(this).text("Bildes");
				TweenMax.to([
					$(".thumbnail-scene-container"),
					$(".thumbnail-scene-wrap .arrow")
				], 0.3, { css: { alpha: 0, rotationX: 50, rotationY: 50, scale: 0.5 } }).eventCallback("onComplete", function () {
					$(".picture-info").fadeIn();
				});
			}
			infoToggled = !infoToggled;
		});
}

function initLogoClick() {
	$(document).on("click", "#contact-page-wrap .logo-container", tween_api.contacts.open);
	//$(document).on("click", "#contact-page-wrap .content-container", tween_api.contacts.close);
	$(document).on("click", ".floating-tag", tween_api.contacts.open);
}

function sectionControler() {
	var self = this;
	self._section = _S.Container.Section.base;

	self.openTL = new TimelineMax({ paused: true });
	self.closeTL = new TimelineMax({ paused: true });

	self.resetSection = function () {
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
	}

	self.resetOverlap = function () {
		TweenMax.set(_S.Body.BGBlur.OverlapingBlur, { css: { visibility: "hidden", display: "none" } });
	}
	
	self.init = function () {
		self.resetOverlap();
		self.resetSection();
	}

	//#region Open Timeline Frames

	self.openTL
		.addLabel("OpenStart", 0)
		.addLabel("BGBlurStart", 0.5)
		.set(_S.Body.BGBlur.OverlapingBlur, { css: { alpha: 0, visibility: "visible", display: "block" } }, "OpenStart")
		.to(self._section, 0.25, { css: { alpha: 1 } }, "OpenStart")
		.to(self._section, 1, { css: { rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1, x: "0px" } }, "OpenStart")
		.set(self._section, { css: { zIndex: 600 } }, "OpenStart+=0.25")
		.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 1 } }, "BGBlurStart")

	//#endregion

	//#region Close Timeline Frames

	self.closeTL
		.to(self._section, 0.5, { css: { alpha: 0, x: "-600px", rotationZ: 45 } }, 0)
		.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 0 } }, 0)

	//#endregion


	self.init();

	return {
		open: function () {
			self.openTL.play().eventCallback("onComplete", function () {
				self._section.find(".section-content-wrap").eq(0).fadeIn(function () {
					animateThumbs();
				});
			});
		},
		close: function () {
			self.closeTL.restart().play().eventCallback("onComplete", function () {
				self.openTL.restart().pause();
				self.resetOverlap();
				self.resetSection();
			}).eventCallback("onStart", function () {
				self._section.find(".section-content-wrap").eq(0).fadeOut();
			});
		}
	}
};

function bubbleTextInit() {
	var comonTimer;
	$(document).on("mouseenter", ".menu-hitbox", function () {
		var $ele = $(this);
		$(".empty-bubble").fadeOut(100);
		$("[data-bubbletextindex=0]").fadeOut(100);
		$(".bubble-text-content").fadeOut(100);
		comonTimer = setTimeout(function () {
			test1.play().eventCallback("onStart", function (something) {
				$(".empty-bubble").fadeIn(200);
				$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").fadeIn(200);
			}).eventCallback("onComplete", function () {
				test1.restart().pause();
			});
		}, 300);
	}).on("mouseleave", ".menu-hitbox", function () {
		var $ele = $(this);
		clearTimeout(comonTimer);
		$(".empty-bubble").stop().fadeOut(100);
		$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").stop().fadeOut(100);
	});
}

function initThumbnails() {

	var prevImage = $(this);

	$("#section-wrap .thumbnail-image-container div.hitbox").each(function () {
		var hoverTL = new tween_api.sections.thumbnails.hover($(this).parent());
		$(this).data("hover_tween", hoverTL);
	});

	$(document).on("mouseenter", ".thumbnail-image-container div.hitbox", function () {
		$(this).data("hover_tween").play();
	}).on("mouseleave", ".thumbnail-image-container div.hitbox", function () {
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

	//$currImg.show();

	$(document).on("click", ".thumbnail-image-container", function (e) {
		if (_S.Container.Section.Description.base.css("display") === "block")
			tween_api.sections.description.hide();
		var nextIndex = $(this).find("img").eq(0).data("mainsceneimageindex") - 1;
		flip(e, nextIndex);
	});

}

function ran(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var rotateThumb = function (_element, _delay) {
	var tl = new TimelineMax({ paused: true, repeat: -1 });

	tl.add(TweenMax.to(_element, 0.4, {
		rotationX: 7,
		rotationY: -7,
		delay: _delay
	}))
        .add(TweenMax.to(_element, 0.4, {
        	rotationX: -7,
        	rotationY: -7,
        	delay: _delay
        }))
    .add(TweenMax.to(_element, 0.4, {
    	rotationX: -7,
    	rotationY: 7,
    	delay: _delay
    }))
    .add(TweenMax.to(_element, 0.4, {
    	rotationX: 7,
    	rotationY: 7,
    	delay: _delay
    }));
	return tl;
}

var animateThumbs = _.once(function () {

	var $thumbnails = $("#section-wrap .thumbnail-image-container div.image-seperate-container img.thumbnail-image");

	for (var i = 0; i < $thumbnails.length; i++) {
		rotateThumb($thumbnails[i], ran(1, 1.6)).play();
	}
});

var animateCursor = _.once(function () {
	console.log("im heere")
	TweenMax.to($(".cursor-icon"), 4, { css: { rotationZ: 360 }, ease: Elastic.easeOut,repeat: -1, repeatDelay: 1})
});

