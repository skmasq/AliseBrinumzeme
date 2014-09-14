/// <reference path="~/Scripts/_references.js" />



var AB_DEBUG = true;
var SectionControler;

if (AB_DEBUG)
	log.setLevel("trace");
else
	log.setLevel("silent");

//#region Utilities

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

function ran(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//#endregion

var GLOBAL = {
	IMAGE_NOT_SPECIFIED: true,
	OVERLAY_LOADED: false,
	SECTION_ANIMATION_ACTIVE: false,
	SECTION_OPEN: false,
	THUMBS_ANIMATION_ACTIVE: false,
	THUMB_POSITION: 0,
	THUMB_LEFT_DISABLED: true,
	THUMB_RIGHT_DISABLED: false,
	WEBSITE_LOADED: false,
	CONTACTS_OPEN: false
}

var CONST = {
	THUMBNAIL_STEP: 111,
	THUMBNAIL_H: 89,
	MAIN_IMG_MAX_H: 260,
	MAIN_IMG_MAX_W: 358,
	SECTIONS: {
		"2": {
			description: "Svaigs, gaisīgs, spilgts, teatrāls...jāveido tā, lai justos skaisti, lai būtu atbilstošs vietai un notikumam!",
			title: "Grims",
			title_size: 40,
			desc_size: 21
		},
		"5": {
			title: "Dekorācijas",
			description: "Svarīgs ir ne tikai svinību saturs, bet arī tā ārejais veidols, gluži kā gaumīgi iesaiņotai konfektei, kas šķitīs daudz gardāka. Tāpēc liela nozīme jāpiešķir it kā nemanāmām detaļām, kas veido kopējo norises vietas noformējumu.",
			title_size: 36,
			desc_size: 18
		},
		"1": {
			title: "Pasākumu Organizēšana",
			description: "Mazāki vai lielāki, privāti vai korporatīvi pasākumi! Svētku darbnīcas mērķis veidojot pasākumus ir panākt īpašu atmosfēru. Tās panākumu atslēga ir pārdomāts pasākuma koncepts.",
			title_size: 30,
			desc_size: 18
		},
		"3": {
			title: "Karnevālu tērpu un aksesuāru noma",
			description: "Pasaku tēli, abstrakti tēli, zvēri, klauni, gadu desmitu mode, tautības, cepures, apavi, galvas rotas u.c.",
			title_size: 27,
			desc_size: 24
		},
		"4": {
			title: "Idejas",
			description: "Paskaties pa atslēgas caurumu darbnīcas radošajās idejās, jaunumos un ieteikumos.",
			title_size: 40,
			desc_size: 25
		}
	},
	Story: {
		Chapter0: "...kādā no Mellužu pagalmiem, kas ievīts ziedošām, krāsainām puķu dobēm, rožu krūmiem un augļu kokiem ...Mazā gaviļniece priekā starodama  iesēdusies dārza malā novietotajā  pludmales strīpota auduma krēslā un mēģina aizmigt...",
		Chapter1: "...kādā no Mellužu pagalmiem, kas ievīts ziedošām, krāsainām puķu dobēm, rožu krūmiem un augļu kokiem ...Mazā gaviļniece sapucēta kā maza princese kuplos, baltos svārkos iesēdusies dārza malā novietotajā  pludmales strīpota auduma krēslā un mēģina aizmigt, lai nemanot laiks aizskrietu līdz brīdim, kad atveras dārza vārtiņi un mazie viesi nāk sveikt gaviļnieci ietērpti karnevāla tērpos - cits tērpts par mazu kautrīgu līgavu baltā naktskreklā ar aizskara plīvura rotu uz galvas , vēl kāda dāmīte lepni plivina savus čigānietes puķainos svārkus, kāds krāsainos krepapīra svārkos, kautrīgi smejot tēlo mazo meža gulbi.",
		Chapter2: "Visapkārt virmo svētku noskaņojums. Krepapīra ziedi un zīda lentas  iesietie zaļojošo ābeļu zaros plivinās vejā, gluži kā piedaloties svētku dejā ko papildina apkārtēja kņada un smiekli. Jubilāres krēsls pārklāts ar plīvojošu audumu, kuram piesprausti krasaini rožu ziedi gaida brīdi, kad mazā dzimšanas dienas svinētāja omulīgi iesēdīsies tajā un tiks pacelta tuvāk baltajiem dūnu mākoņiem un spožai, sildošai saulei, skaitot līdzi viens, divi, trīs ...",
		Chapter3: "No mazām bērnu dienām esmu gaidījusi un izbaudījusi tos brīžus, kuri atsķīrušies no ikdienas, iespējams tieši šīs atmiņas ir tās, kas iedvesmojušas manu radošo garu, baudīt laiku un piešķirt vietai un notikumiem īpašu atmosfēru.",
		Chapter4: "Gandarījums  - realizēts  sapnis nodarboties ar savām sirdslietām - grims, svētku rīkošana, dekorāciju, tērpu un aksesuāru veidošana...<br/>Radīt atmosfēŗu<br/>Radīt svētkus<br />Radīt ikdienišķo krāšņu<br />Radīt ierasto tēlainu<br />Izcelt skaisto"
	}
}

function ApplicationStore() {
	var _self = this;

	_self.SectionStore = function (SectionID) {

		var _sectionstore = this;

		_sectionstore.ID = SectionID;
		_sectionstore.Images = [];
		_sectionstore.ImageData = [];
		_sectionstore.Thumbnail = "";
		_sectionstore.ImagesLoaded = null;
		_sectionstore.Parameters = {};

		// Fetch data and return a Promise
		_sectionstore.Loaded = new function () {
			return $.Deferred(function (def) {
				var returnedData = {};
				log.debug("[" + Date.now() + "] Section [" + _sectionstore.ID + "]: Loading images from server...");
				$.ajax({
					url: "/api/sectionapi/" + SectionID,
					type: "GET",
					contentType: "application/json",
					dataType: "json",
					success: function (data) {
						log.debug("[" + Date.now() + "] Section [" + _sectionstore.ID + "]: Images have been loaded");
						// Mock up data
						returnedData = JSON.parse(data);
						console.log(returnedData);

						// Set data
						_sectionstore.ImageData = returnedData.i;
						_sectionstore.Thumbnail = "/Content/u/" + returnedData.t;


						// Set Image array
						_.each(returnedData.i, function (item) {
							_sectionstore.Images.push("/Content/u/" + item.u);
						});
						setTimeout(def.resolve, 0);
					},
					error: function () {
						log.warn("[" + Date.now() + "] Section [" + _sectionstore.ID + "]: Error loading Images from server");
						log.debug(arguments);
						def.resolve();
					}
				});
			}).promise();
		};

		// Initiate Image Load to start after Loaded finished and return a Promise
		_sectionstore.LoadImages = function () {
			return $.Deferred(function (def) {
				// Wait for Image data
				$.when(_sectionstore.Loaded).done(function () {
					var cacheImageCount = _sectionstore.Images.length;
					var counter = 0;
					log.debug("[" + Date.now() + "] Section [" + _sectionstore.ID + "]: Caching section images...");
					$.cacheImage(_sectionstore.Images.concat(_sectionstore.Thumbnail), {
						complete: function (e) {
							if (++counter === cacheImageCount) {
								log.debug("[" + Date.now() + "] Section [" + _sectionstore.ID + "]: All Images have been cached");
								def.resolve();
							}
						}
					});
				});

			}).promise();
		};

		// Get Single Image data
		_sectionstore.GetImageData = function (ImageID) {
			if (typeof ImageID === "undefined")
				return "";
			if (isNaN(Number(ImageID)))
				return "";
			return _.find(_sectionstore.ImageData, function (item) {
				return item.id === ImageID;
			});
		}

		return {
			GetImages: function () { return _sectionstore.Images },
			GetImagesData: function () { return _sectionstore.ImageData },
			GetImageData: _sectionstore.GetImageData,
			GetThumbnail: function () { return _sectionstore.Thumbnail },
			Loaded: _sectionstore.Loaded,
			LoadImages: _sectionstore.LoadImages,
			ID: _sectionstore.ID
		}
	}

	_self.Store = [];

	_self.Add = function (SectionID) {
		if (typeof SectionID === "undefined")
			return 0;
		if (isNaN(Number(SectionID)))
			return 0;
		if (_.find(_self.Store, function (item) { return item.ID === SectionID }))
			return 1;

		// Add new Store to list
		_self.Store.push(new _self.SectionStore(SectionID));
		return 1;
	};

	_self.Get = function (SectionID) {
		if (typeof SectionID === "undefined")
			return 0;
		if (isNaN(Number(SectionID)))
			return 0;
		return _.find(_self.Store, function (item) { return item.ID === SectionID }) || 0;
	}

	return {
		Get: _self.Get,
		Add: _self.Add
	}
}

function SectionFactory(AppStore) {
	var _self = this;
	_self.AppStore = AppStore;

	//#region Namespaces

	_self.PL = {};
	_self.PL.Section = {};
	_self.Controlers = {};

	//#endregion

	//#region Presentation Layer

	// Open Section Container
	_self.PL.Section.Open = new function () {
		var tl = new TimelineMax({ paused: true });

		// Add Labels
		tl
			.addLabel("ContainerOpenStart", 0)
			.addLabel("BackgroundBlurStart", 0.5)
		// Set Element Styles
			.set(_S.Body.BGBlur.OverlapingBlur, { css: { alpha: 0, visibility: "visible", display: "block" } }, "ContainerOpenStart")
			.set(_S.Container.Section.base, { css: { zIndex: 600 } }, "ContainerOpenStart+=0.25")
		// Add animations
			.to(_S.Container.Section.base, 0.25, { css: { alpha: 1 } }, "ContainerOpenStart")
			.to(_S.Container.Section.base, 1, { css: { rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1, x: "0px" } }, "ContainerOpenStart")
			.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 1 } }, "BackgroundBlurStart")

		return tl;
	}

	// Close Section Container
	_self.PL.Section.Close = new function () {
		var tl = new TimelineMax({ paused: true });

		// Add Labels
		tl
			.addLabel("CloseSectionStart", 0)
		// Add Element Animations
			.to(_S.Container.Section.base, 0.5, { css: { alpha: 0, x: "-600px", rotationZ: 45 } }, "CloseSectionStart")
			.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 0 } }, "CloseSectionStart")
			.to(_S.Container.Section.Content, 0.3, { css: { alpha: 0 } }, "CloseSectionStart")
			.set(_S.Container.Section.Content, { css: { alpha: 1, display: "none" } }, "CloseSectionStart+=0.5")
			.addCallback(function () { tween_api.sections.description.show(); });

		return tl;
	}

	// Overlap Reset
	_self.PL.Section.ResetOverlap = function () {
		TweenMax.set(_S.Body.BGBlur.OverlapingBlur, { css: { visibility: "hidden", display: "none" } });
	}
	// Section Reset
	_self.PL.Section.ResetSection = function () {
		TweenMax.set(_S.Container.Section.base, {
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

	//#endregion

	//#region Models

	//#endregion

	//#region Controlers

	_self.Controlers.loadevents = function () {
		$(document)
				.on("click.sectionfactory", ".thumbs-left-click", _self.Controlers.ThumbsPrevPage)
				.on("click.sectionfactory", ".thumbs-right-click", _self.Controlers.ThumbsNextPage)
	}

	_self.Controlers.unloadevents = function () {
		$(document).off(".sectionfactory");
	}

	_self.Controlers.GetImage_WH = function (ImageElement) {

		var _image_self = {};
		_image_self.Width = ImageElement.width;
		_image_self.Height = ImageElement.height,
		_image_self.NewWidth = null;
		_image_self.NewHeight = null;
		_image_self.Direction = "";

		// Get Image Ratio depending on which side is longer
		_image_self.Ratio =
				(_image_self.Height > _image_self.Width)
				? _image_self.Width / _image_self.Height
					: (_image_self.Width > _image_self.Height)
					? _image_self.Height / _image_self.Width
						: 1;

		// Calculate new lengths
		if (_image_self.Height > _image_self.Width) {
			_image_self.NewWidth = CONST.MAIN_IMG_MAX_H * _image_self.Ratio;
			_image_self.NewHeight = CONST.MAIN_IMG_MAX_H;
			_image_self.Direction = "vpos-image";
		} else if (_image_self.Width >= _image_self.Height) {
			_image_self.NewWidth = CONST.MAIN_IMG_MAX_W;
			_image_self.NewHeight = _image_self.Ratio * CONST.MAIN_IMG_MAX_W;
			_image_self.Direction = "hspos-image";
		}

		return {
			Width: _image_self.NewWidth,
			Height: _image_self.NewHeight,
			Direction: _image_self.Direction
		}
	}

	_self.Controlers.InjectImages = function () {
		return $.Deferred(function (def) {
			var ImageList = _.sortBy(_self.SectionStore.GetImagesData(), "o");
			var ImageListLength = ImageList.length;
			var counter = 0;
			var ImageInjectList = [];

			// Clear list
			_S.Container.Section.MainScene.Container.children().remove();

			// Add new images
			_.forEach(_.sortBy(_self.SectionStore.GetImagesData(), "o"), function (imageDetails) {

				var NewImage = $("<img />", {
					src: "/Content/u/" + imageDetails.u
				});

				//var NewDimensions = _self.Controlers.GetImage_WH(NewImage[0]);
				var direction = "hspos-image";
				if (NewImage[0].height > NewImage[0].width) {
					direction = "vpos-image";
				} else if (NewImage[0].width >= NewImage[0].height) {
					direction = "hspos-image";
				}

				var ContainerWidth = _S.Container.Section.MainScene.Container.width();
				ImageInjectList.push(
					NewImage
						.attr("width", NewImage[0].width)
						.attr("height", NewImage[0].height)
						.addClass(direction)
						.addClass("main-scene-image-container")
						.attr("data-mainsceneimageindex", imageDetails.o)
						.attr("data-imagedbid", imageDetails.id)
						.css({
							marginLeft: (CONST.MAIN_IMG_MAX_W - NewImage[0].width) / 2,
							marginTop: (CONST.MAIN_IMG_MAX_H - NewImage[0].height) / 2
						})
				);
			});

			_S.Container.Section.MainScene.Container.append(ImageInjectList);
			def.resolve();
		}).promise();
	}

	_self.Controlers.ThumbsPrevPage = function () {
		if (GLOBAL.THUMB_POSITION > 5 && !GLOBAL.THUMB_LEFT_DISABLED) {
			_self.Controlers.SetThumbnails(_self.SectionStore.GetThumbnail(), GLOBAL.THUMB_POSITION - 6, _self.SectionStore.GetImagesData());
		}
	}

	_self.Controlers.ThumbsNextPage = function () {
		if (!GLOBAL.THUMB_RIGHT_DISABLED) {
			_self.Controlers.SetThumbnails(_self.SectionStore.GetThumbnail(), GLOBAL.THUMB_POSITION + 6, _self.SectionStore.GetImagesData());
		}
	}

	_self.Controlers.SetThumbnails = function (thumb, position, ImagesData) {
		if (!GLOBAL.THUMBS_ANIMATION_ACTIVE) {
			if (_.find(ImagesData, function (item) { return item.o === position })) {

				GLOBAL.THUMBS_ANIMATION_ACTIVE = true;
				// Initialize next thumb State
				var elementCounter = 0;
				var positionCounter = position;
				var nextStateContainer = [];
				var DisabledRight = false;
				var Direction = (position > GLOBAL.THUMB_POSITION) ? "right" : "left";

				//#region State changes
				_.each(_.sortBy(ImagesData, function (item) { return +item.o; }), function (item) {
					if (item.o === positionCounter && (positionCounter < position + 6)) {
						_S.Container.Section.Thumbnails.list[elementCounter].attr("data-mainsceneimageindex", positionCounter);
						var elementToAnimate = _S.Container.Section.Thumbnails.list[elementCounter];
						var currentPos = positionCounter;
						nextStateContainer.push(function () {
							var tl = new TimelineMax();
							tl
								.to(elementToAnimate, 0.2, { css: { scale: 0 } })
								.set(elementToAnimate, {
									css: {
										background: "url(" + thumb + ") -" + ((currentPos - 1) * CONST.THUMBNAIL_STEP) + "px 0px no-repeat"
									}
								})
								.append(function () { elementToAnimate.removeClass("no-image"); });
						});

						elementCounter++;
						positionCounter++;
					}
				});
				//#endregion

				//#region Add remaining state changes
				var leftoverCounter = elementCounter;
				_.each([0, 1, 2, 3, 4, 5], function (item) {
					if (leftoverCounter < 6) {
						DisabledRight = true;
						_S.Container.Section.Thumbnails.list[elementCounter].attr("data-mainsceneimageindex", leftoverCounter + 1);
						var elementToAnimate = _S.Container.Section.Thumbnails.list[leftoverCounter];
						nextStateContainer.push(function () {
							var tl = new TimelineMax();
							tl
								.to(elementToAnimate, 0.2, { css: { scale: 0 } })
								.set(elementToAnimate, { css: { background: "" } })
								.append(function () { elementToAnimate.addClass("no-image") });
						});
					}
					leftoverCounter++;
				});
				//#endregion


				GLOBAL.THUMB_POSITION = position;

				var tl = new TimelineMax({
					onComplete: function () {
						GLOBAL.THUMBS_ANIMATION_ACTIVE = false;
					}
				});

				tl.add((Direction === "left")
					? nextStateContainer.reverse()
						: nextStateContainer, 0, "sequence", 0.05);

				tl.add(TweenMax.staggerTo((Direction === "left")
					? _S.Container.Section.Thumbnails.all.get().reverse()
						: _S.Container.Section.Thumbnails.all, 0.2, { css: { scale: 1 } }, 0.05), 0.3);

				tl.set(_S.Container.Section.Thumbnails.all, { css: { scale: 1 } })

				if (position === 1) {
					GLOBAL.THUMB_LEFT_DISABLED = true;
				} else {
					GLOBAL.THUMB_LEFT_DISABLED = false;
				}
				if (DisabledRight) {
					GLOBAL.THUMB_RIGHT_DISABLED = true;
				} else {
					GLOBAL.THUMB_RIGHT_DISABLED = false;
				}
			}
		}
	}

	_self.Controlers.LoadOpenAnimation = function () {
		return $.Deferred(function (def) {
			_self.PL.Section.Open.eventCallback("onStart", function () {
				log.debug("[" + Date.now() + "] Global: Section Open Animation Started");
				GLOBAL.SECTION_ANIMATION_ACTIVE = true;
			}).eventCallback("onComplete", function () {
				log.debug("[" + Date.now() + "] Global: Section Open Animation Ended");
				GLOBAL.SECTION_ANIMATION_ACTIVE = false;
				def.resolve();
			}).play();
		}).promise();
	};

	_self.Controlers.LoadCloseAnimation = function () {
		return $.Deferred(function (def) {
			_self.PL.Section.Close.eventCallback("onStart", function () {
				log.debug("[" + Date.now() + "] Global: Section Close Animation Started");
				GLOBAL.SECTION_ANIMATION_ACTIVE = true;
			}).eventCallback("onComplete", function () {
				log.debug("[" + Date.now() + "] Global: Section Close Animation Ended");
				_self.PL.Section.Open.restart().pause();
				_self.PL.Section.ResetOverlap();
				_self.PL.Section.ResetSection();
				GLOBAL.SECTION_ANIMATION_ACTIVE = false;
				GLOBAL.THUMB_POSITION = 0;
				def.resolve();
			}).restart().play();
		}).promise();
	};

	_self.Controlers.LoadSectionData = function (SectionStore) {
		return $.Deferred(function (def) {
			$.when(SectionStore.Loaded, SectionStore.LoadImages()).done(function () {
				log.debug("[" + Date.now() + "] Section [" + SectionStore.ID + "]: Section Data and Images have been loaded");
				def.resolve();
			});
		}).promise();
	}

	_self.Controlers.Navigate = function (SectionID, ImageID) {
		/// <summary>Navigate to Section/Image</summary>
		/// <param name="SectionID" type="Int">Section ID</param>
		/// <param name="ImageID" type="Int">(optional) Image ID</param>

		var _navigator = this;

		//	Block: Get Section ID
		//	Description:
		//		IF
		//			- Section ID is not supplied
		//			- or Section is allready Open
		//			- or Section Currently is animating
		try {
			if (isNaN(Number(SectionID)) || GLOBAL.SECTION_OPEN || GLOBAL.SECTION_ANIMATION_ACTIVE)
				return;
			else
				_navigator.SectionID = SectionID;
		} catch (ex) {
			return;
		}

		// Get Image ID if supplied
		_navigator.ImageID = (typeof ImageID !== "undefined")
			? (isNan(Number(ImageID)))
				? GLOBAL.IMAGE_NOT_SPECIFIED = true
					: ImageID
				: GLOBAL.IMAGE_NOT_SPECIFIED = true;



		// Add Section to Application Store
		AppStore.Add(SectionID);

		// TODO: Instead loading all Images, load only images for thumbnail set

		$.when(_self.Controlers.LoadOpenAnimation(), _self.Controlers.LoadSectionData(AppStore.Get(SectionID))).done(function () {
			// TODO[1]: Check if Image is supplied
			// TODO[2]: Set thumbnail images
			_self.Controlers.loadevents();
			_self.SectionStore = AppStore.Get(SectionID);
			log.debug("[" + Date.now() + "] Section [" + SectionID + "]: Injecting images...");
			$.when(_self.Controlers.InjectImages()).done(function () {
				log.debug("[" + Date.now() + "] Section [" + SectionID + "]: All images have been injected");

				log.debug("[" + Date.now() + "] Section [" + SectionID + "]: Setting section description.");

				// Section description
				var secDesc = CONST.SECTIONS["" + SectionID + ""];
				$(".section-description-container .description-title")
					.text(secDesc.title)
					.css("font-size", secDesc.title_size + "px");
				$(".section-description-container .description-content")
					.text(secDesc.description)
					.css("font-size", secDesc.desc_size + "px");

				_S.Container.Section.Thumbnails.all.css("background", "").addClass("no-image");
				_self.Controlers.SetThumbnails(_self.SectionStore.GetThumbnail(), 1, _self.SectionStore.GetImagesData());
				_S.Container.Section.Content.fadeIn(animateThumbs);
			});
		});

	}

	_self.Controlers.InitializeFactory = function () {
		_self.PL.Section.ResetSection();
		_self.PL.Section.ResetOverlap();
	}

	//#endregion

	//#region Actions

	_self.Controlers.InitializeFactory();

	//#endregion

	return {
		Navigate: _self.Controlers.Navigate,
		Close: _self.Controlers.LoadCloseAnimation
	}
}

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
			PictureInfo: $("#section-wrap .picture-info"),
			Thumbnails: {
				base: $(".thumbnail-scene-wrap"),
				Container: {
					base: $(".thumbnail-scene-wrap .thumbnail-scene-container")
				},
				Arrows: $(".thumbnail-scene-wrap .arrow"),
				all: $(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container"),
				list: [
					$(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container[data-thumbnailposition=1]"),
					$(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container[data-thumbnailposition=2]"),
					$(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container[data-thumbnailposition=3]"),
					$(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container[data-thumbnailposition=4]"),
					$(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container[data-thumbnailposition=5]"),
					$(".thumbnail-scene-wrap .thumbnail-scene-container .image-seperate-container[data-thumbnailposition=6]")
				]
			},
			MainScene: {
				base: $(".main-scene-wrap"),
				Container: $(".main-scene-container"),
				InfoToggle: $(".info-toggle")
			},
			InfoBook: $(".info-book-wrap"),
			Content: $(".section-content-wrap")
		},
		Contacts: {
			base: $("#contact-page-wrap"),
			Logo: {
				base: $("#contact-page-wrap .logo-container")
			},
			Content: {
				base: $("#contact-page-wrap .content-container")
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

var catureScreenshot = _.once(function () {
	html2canvas($("#viewport"), {
		background: "#000",
		onrendered: function (canvas) {
			$(".overlaping-blur").show();

			// Set fullscreen
			$("#canvas-container").append(canvas);
			$(canvas)
				.attr("id", "canvas")
				.width($(window).width())
				.height($(window).height());
			// Set blur
			stackBlurCanvasRGB('canvas', 0, 0, $("#canvas").width(), $("#canvas").height(), 7);
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
			},
			changeToDetails: function () {
				var tl = new TimelineMax({ paused: true });

				tl
					.add(function () { _S.Container.Section.MainScene.InfoToggle.text("Bildes") }, 0)
					.to([
						_S.Container.Section.Thumbnails.Container.base,
						_S.Container.Section.Thumbnails.Arrows
					], 0.3, { css: { alpha: 0, rotationX: 50, rotationY: 50, scale: 0.5 } }, 0)
					.set(_S.Container.Section.PictureInfo, { css: { display: "block", alpha: 0 } })
					.to(_S.Container.Section.PictureInfo, 0.3, { css: { alpha: 1 } });

				return tl;
			},
			changeToThumbnails: function () {
				var tl = new TimelineMax({ paused: true });

				tl
					.add(function () { _S.Container.Section.MainScene.InfoToggle.text("Info") }, 0)
					.to(_S.Container.Section.PictureInfo, 0.1, { css: { alpha: 0 } }, 0)
					.set(_S.Container.Section.PictureInfo, { css: { display: "none" } })
					.to([
						_S.Container.Section.Thumbnails.Container.base,
						_S.Container.Section.Thumbnails.Arrows
					], 0.3, { css: { alpha: 1, rotationX: 0, rotationY: 0, scale: 1 } }, 0);

				return tl;
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
				// Set labels
				tl
					.add("start", 0)

				// Prepare elements
					.add(function () { _S.Container.Section.MainScene.InfoToggle.text("Info") }, "start")
					.set(_S.Container.Section.Description.base, { css: { display: "block" } }, "start")

				// Animate thumbnails
					.to([
						_S.Container.Section.Thumbnails.Container.base,
						_S.Container.Section.Thumbnails.Arrows
					], 0.3, { css: { alpha: 1, rotationX: 0, rotationY: 0, scale: 1 } }, "start")

				// Hide image details
					.to(_S.Container.Section.PictureInfo, 0.1, { css: { alpha: 0 } }, "start")
					.set(_S.Container.Section.PictureInfo, { css: { display: "block" } })

				// Show Sections description
					.to(_S.Container.Section.InfoBook, 0.1, { css: { alpha: 0 } }, "start")
					.to(_S.Container.Section.Description.base, 0.5, {
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
					}, "start")
					.to(_S.Container.Section.MainScene.base, 0.5, { css: { alpha: 0 } }, "start")

				// Set elements
					.set(_S.Container.Section.MainScene.base, { css: { visibility: "hidden" } }, "start+=0.5")
					.set(_S.Container.Section.InfoBook, { css: { display: "none" } }, "start+=0.5")

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
						TweenMax.to(SCENE.Table.BottomLayer.TableRabbit.Base, tlFrameLength[0], { css: { bottom: -18 }, ease: Elastic.easeIn })
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
					tl.add(TweenMax.to(SCENE.Table.TopLayer.PinkBird, 0.5, { css: { rotation: 0, top: -108, left: 225, opacity: 1 } }), 0);
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
					marginLeft: 125
				}
			});
		},
		open: function () {
			var contact_page = $("#contact-page-wrap");
			var tl = new TimelineMax({
				paused: true,
				onComplete: function () {
					GLOBAL.CONTACTS_OPEN = true;
				}
			});

			// Prepare elements
			tl.set(_S.Container.Contacts.base, { css: { zIndex: 550 } }, 0)
			  .set(_S.Body.BGBlur.OverlapingBlur, { css: { alpha: 0, visibility: "visible", display: "block" } }, 0);

			// Define animation
			tl.to(_S.Container.Contacts.Logo.base, 0.1, { css: { alpha: 0 } }, 0)
				.set(_S.Container.Contacts.Logo.base, { css: { display: "none" } })
				.to(contact_page, 1, {
					css: {
						rotation: 0,
						bottom: "50%",
						height: 740,
						width: 498,
						marginBottom: -370,
						marginLeft: -249
					}
				}, 0.1)
				.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 1 } }, 0.6)
				.set(_S.Container.Contacts.Content.base, { css: { display: "block", alpha: 0 } })
				.to(_S.Container.Contacts.Content.base, 0.1, { css: { alpha: 1 } })
				.addCallback(animateCursor);

			return tl;
		},
		close: function () {
			var contact_page = $("#contact-page-wrap");
			var tl = new TimelineMax({ paused: true, onComplete: function () { GLOBAL.CONTACTS_OPEN = false; } });

			tl
				.to(_S.Container.Contacts.Content.base, 0.1, { css: { alpha: 0 } }, 0)
				.set(_S.Container.Contacts.Content.base, { css: { display: "none" } })

				.to(_S.Body.BGBlur.OverlapingBlur, 0.5, { css: { alpha: 0 } }, 0)
				.set(_S.Body.BGBlur.OverlapingBlur, { css: { visibility: "hidden", alpha: 0, display: "none" } })

				.to(contact_page, 1, {
					css: {
						rotation: 93,
						bottom: 100,
						height: 225,
						width: 151,
						marginBottom: 0,
						marginLeft: 125
					}
				}, 0)
				.set(_S.Container.Contacts.base, { css: { zIndex: 400 } })
				.set(_S.Container.Contacts.Logo.base, { alpha: 0, display: "block" })
				.to(_S.Container.Contacts.Logo.base, 0.1, { alpha: 1 })

			return tl;

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
							TweenMax.to(_S.Body.BlueDove.Key, 1.5, { css: { left: "-=100px", bottom: -700, } })
					]);

					tl.add(TweenMax.to(_S.Body.BlueDove.Key, 0.3, { css: { alpha: 0 } }), 3.7);
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
	return $.Deferred(function (def) {

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
			.addLabel("ACT_III", "animalsHide+=3")
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
					}, 2000);
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

				// Release events
				def.resolve();
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
	}).promise();
};

function chapterControl() {
	var self = {}

	self.currentChapter = 0;

	self.Normal = function () {
		$(".visible-part").html(CONST.Story.Chapter0);
		$(".chapter-control").hide();
		$(".phone-number-container").fadeIn();
		$(".email-container").fadeIn();
		$(".find-us-container").fadeIn();
		$(".map-container").fadeIn();
		$(".open-chapter").fadeIn();
		self.currentChapter = 0;
	};

	self.SelectChapter = function (chapterID) {
		$(".visible-part").html(CONST.Story["Chapter" + chapterID]);
		$(".chapter-control").show();
		if (chapterID === 1)
			$(".chapter-control.prev").hide();
		$(".phone-number-container").hide();
		$(".open-chapter").hide();
		$(".email-container").hide();
		$(".find-us-container").hide();
		$(".map-container").hide();
		self.currentChapter = chapterID;
	}

	$(document)
		.on("click", ".chapter-control", function () {
			if ($(this).hasClass("prev")) {
				$(".chapter-control.next").show();

				if(self.currentChapter === 1)
					$(".chapter-control.prev").hide();
				else {
					self.SelectChapter(self.currentChapter - 1);
					if (self.currentChapter === 1)
						$(".chapter-control.prev").hide();
				}
			} else if ($(this).hasClass("contacts")) {
				self.Normal();
				self.currentChapter = 0;
			} else {
				$(".chapter-control.prev").show();

				if (self.currentChapter === 4)
					$(".chapter-control.next").hide();
				else {
					self.SelectChapter(self.currentChapter + 1);
					if (self.currentChapter === 4)
						$(".chapter-control.next").hide();
				}
			}
		})
		.on("click", ".open-chapter", function () { self.SelectChapter(1) })

	return self;
}

var ChapterController = new chapterControl();

$(document).ready(function () {
	SectionControler = new SectionFactory(new ApplicationStore());
	pageInitialization();
	$.when(initStartPage()).always(function () {
		bootstarter();
	});
});

function pageInitialization() {
	setWelcomeMessage();
	$("#shelve-wrap").hide();
	$("#window-wrap").hide();
	initBGSwitch();
	tween_api.contacts.set();
}

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
	var tl = new TimelineMax({ repeat: -1, repeatDelay: 5, delay: 3.5 });
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
		log.debug(e);
	}, 200);
	var rabbitTO,
		infoToggled = false,
		ContactOpen = tween_api.contacts.open(),
		ContactClose = tween_api.contacts.close(),
		SwitchToDetails = tween_api.sections.thumbnails.changeToDetails(),
		SwitchToThumbnails = tween_api.sections.thumbnails.changeToThumbnails(),
		comonTimer,
		prevImage = $(this);

	// Attach animation to thumbnails
	$("#section-wrap .thumbnail-image-container div.hitbox").each(function () {
		var hoverTL = new tween_api.sections.thumbnails.hover($(this).parent());
		$(this).data("hover_tween", hoverTL);
	});

	$(document)
		.on("mouseenter", ".shelve-container", function () {
			$(".shelve-hover-state").stop().fadeIn()
		})
		.on("mouseleave", ".shelve-container", function () {
			$(".shelve-hover-state").stop().fadeOut()
		})
		.on("click", ".shelve-container", function () { ContactOpen.restart().play(); })
		.on("click", ".info-book-wrap", tween_api.sections.description.show)
		.on("click", ".menu-hitbox", function () {
			log.debug("[" + Date.now() + "] Menu Index [" + $(this).data("menutextindex") + "]");
			if ($(this).data("menutextindex") != "6")
				SectionControler.Navigate($(this).data("menutextindex"));
			else {
				ChapterController.SelectChapter(1);
				ContactOpen.restart().play();
			}
				
		})
		.on("click", ".overlap-taint", function () {
			SectionControler.Close();
			if (GLOBAL.CONTACTS_OPEN) {
				ContactClose.restart().play();
				ChapterController.Normal();
			}
		})
		.on("click", ".close-button", function () {
			SectionControler.Close()
		})
		.on("click", ".close-button-contacts", function () { ContactClose.restart().play(); ChapterController.Normal(); })
		.on("click", ".info-toggle", function () {
			if (infoToggled)
				SwitchToThumbnails.restart().play();
			else
				SwitchToDetails.restart().play();
			infoToggled = !infoToggled;
		})
		.on("click", "#contact-page-wrap .logo-container", function () { ContactOpen.restart().play(); })
		.on("mouseenter", ".menu-hitbox", function () {
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
		})
		.on("mouseleave", ".menu-hitbox", function () {
			var $ele = $(this);
			clearTimeout(comonTimer);
			$(".empty-bubble").stop().fadeOut(100);
			$("[data-bubbletextindex=" + $ele.data("menutextindex") + "]").stop().fadeOut(100);
		})
		.on("mouseenter", ".thumbnail-image-container div.hitbox", function () {
			$(this).data("hover_tween").play();
		})
		.on("mouseleave", ".thumbnail-image-container div.hitbox", function () {
			$(this).data("hover_tween").reverse();
		})
		.on("click", ".thumbnail-image", function () {
			$(this).css("opacity", ".7");

			if (prevImage.attr("src") != $(this).attr("src")) {
				prevImage.css("opacity", "1");
			}
			prevImage = $(this);
		});
}

function initBGSwitch() {

	CSSPlugin.defaultTransformPerspective = 500;

	var $imgWrap = $('.main-scene-container'),
		$images = $imgWrap.find('img'),
		$currImg = $images.eq(0),
		index = 0,
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
			css: { rotationY: 90, z: flipDepth, rotationX: randomVal, alpha: 0.3, transformPerspective: 500 },
			ease: Expo.easeIn
		});

		tl.append(function () {
			$currImg.hide();
			$images.eq(index).show();
		})

		tl.fromTo($images.eq(index), flipDur / 2,
			// We need to flip the number sign fo rotationX, so we do -randomVal instead of randomVal
			{ css: { rotationY: -90, z: flipDepth, rotationX: -randomVal, alpha: 0.3, transformPerspective: 500 } },
			{ css: { rotationY: 0, z: 0, rotationX: 0, alpha: 1, transformPerspective: 500 }, ease: Expo.easeOut }
		);
	};

	$(document)
		.on("click", ".thumbnail-image-container", function (e) {
			// Get new list of images
			$images = $imgWrap.find('img');

			if (_S.Container.Section.Description.base.css("display") === "block")
				tween_api.sections.description.hide();
			var nextIndex = $(this).find(".image-seperate-container").eq(0).attr("data-mainsceneimageindex") - 1;
			flip(e, nextIndex);
		})
		.on("click", ".main-scene-wrap > .arrow", function (e) {
			if ($(this).hasClass("left")) {
				if(index !== 0)
					flip(e, index-1);
			} else {
				if (index !== $images.length - 1)
					flip(e, index + 1);
			}
		});

}

var rotateThumb = function (_element, _delay) {
	var tl = new TimelineMax({ paused: true, repeat: -1, yoyo: true });

	tl
		.to(_element, 0.6, { css: { rotationX: 7, rotationY: -7 } }, 0)
		.to(_element, 0.6, { css: { rotationX: -7, rotationY: -7 }, delay: _delay })
		.to(_element, 0.6, { css: { rotationX: -7, rotationY: 7 }, delay: _delay })
		.to(_element, 0.6, { css: { rotationX: 7, rotationY: 7 }, delay: _delay });

	return tl;
}

var animateThumbs = _.once(function () {

	//var $thumbnails = $("#section-wrap .thumbnail-image-container div.image-seperate-container");
	//TweenMax.set($("#section-wrap .thumbnail-image-container .hitbox"), { css: { zIndex: 200 } })
	//for (var i = 0; i < $thumbnails.length; i++) {
	//	rotateThumb($thumbnails[i], 2).play();
	//}
});

var animateCursor = _.once(function () {
	TweenMax.to($(".cursor-icon"), 4, { css: { rotationZ: 360 }, ease: Elastic.easeOut, repeat: -1, repeatDelay: 1 })
});
