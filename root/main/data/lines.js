﻿
var lines = [

    //L

    //гл
    "L101U L402U",
    "L102R L202R L302R",
    "L103L L203L L303L L403L",
    "L104U L206U L306U L406U",
    "L105L L207L L307L L407L",
    "L201R L301R L401R",
    "L204L L304L L404L",
    "L205L L305L L405L",
    "L208L L308L L408L",
    "L210D L309U",
    "L211D L310U",
    "L106L L212L",
    "L115U L209U",

    //з
    "L210D L309U L409U L509U",
    "L211D L310U L410U L510U",

    //1
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "L101U 144 143 142 X101",
    "X101 145 141а 146 141 147 148 L102R 140а 149 140 139 150 138 L103L X102",
    "151 X102 165 X103 136 166 X104 X105 167 X106 101 102 120 119 118 116 116а 115 114 113 X107",
    "130а 130 129 128б 128а 131 127 126 L105L 125а 125б 131а 132а 132б 133 134 123 135 122 135в X105",
    "L104U X104 ВХОД",
    "X107 X108",
    "X108 X121 X114",
    "X114 X113",
    "X111 L106L",
    "L115U X121",

    //и
    "X110 X111 113и X113 114аи 114и X116 115и 116и 121и 117и 120и 119и",
    "X109 111и X110",
    "X109 104и 109и 108и 105и X112 103и 107и 102и 101и X115",
    "X115 111би L108R X116",

    //2
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "X208 L206U",
    "X202 24 23 22 21 20 19 18 17 15 13 X203",
    "X202 25 26 L201R 27 42 28 29 41 30 40 31 39 32 38 33 34 35 37 X201",
    "X201 36",
    "X203 13 12 14 16 9 11 11а 10 L202R 6 8 5 7 7а 3 2 4 4а 1 L203L X204",
    "253 254 254а 253а X204 252а 252 X205 251 288 X208 X209 232а 232 X210 230 229 227 226 225 224 223 222 221а 220 221 L209U X211",
    "242 243 241 240 244 245 239 238 L207L 237 246 236а 246а 236 247 235 249 235а 234 233 250 X209",
    "X210 215а 217 214 215 213 212 210 211 208 209 206 207 L208L",
    "X205 280 287б 280а 287а 282 287 278 285 276 274 283а 272 283 270 277 268 L205L 277а 273 268а 269 274 X207",
    "X206 261а 261 262 263 264 264а 265 266 267 X207",
    "X206 260 259 258 257 256 255 L204L",

    //з
    "X211 L210D",
    "L211D X214",

    //и
    "X214 L212L",
    "X214 X216",
    "X216 X215",
    "X213 X215 201и 201аи 202и 203и 204и 205и 206и 207и 208и X219 X220 209и 210и 211и",
    "X220 L214R",
    "X219 200би 200аи X218",
    "X218 103аи 107би X217 104аи 107аи 106аи 106и X212",
    "X217 L213R",
    "X212 X213",

    //3
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //гл
    "387 388 389 X301",
    "X301 386 385 390 384 391 383 392 382 L301R 381",
    "346 345 344 343 342 341а X303",
    "X303 341 347 340 348 339 349 L302R 350а 338 350 351а 337 351б 336 351 L303L X304",
    "L304L 354 355 356 357 358 X302",
    "X302 359а 359 360 361 362 363 364 365а 365 X306",
    "X305 380 377 378 374 375 374а 373 372 371 370 368 367 L305L 368б 366 368а X306",
    "352 352а 353 351в X304 335 X305 X307 X308 000 X309",
    "329 330 328 330 327 L307L 327а 331 326 333 334 325 325 323 X308",
    "X309 312 314 315 310 313 308 311 306 309 307 304 L308L 305 302 X310",
    "X310 300 301 301а 303 301в X312",
    "X312 301б",
    "X307 L306U",

    //и
    "300и 301и X311 302и 303и 304и 306и 307и 308и 309и 311и 313и X316 312и 314и 315и",
    "L311L X311",
    "L312R X316",

    "L212L L311L",
    "L214R L312R",

    //з
    "L309U X322 19з 20з 21з 22з 23з 24з 25з 26з 26аз 28з 27з 30з 29з 31з X323 L310U",


    //4
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "438 439 440 L404L 441 442",
    "L403L 435 436 X402",
    "437 X402 X403 429 X404 X405 X406",
    "X403 454 455 452а 455а 452 455б 453 450а 450 451 445 L405L 448 446 447 445 445а 445б 445в",
    "L406U X404",
    "423 424 425 L407L 422 426а 421 426б 426 427 420 428 419 X405",
    "X406 414 415 416 417 412 410а 410б 413 410 411 408 411а 406 409 L408L 407 405 401 402 403 404",

    //и
    "L411L X411 400и 401.1и 402и 401.2и 404и 403и 406и 405и 407и 408и X416 410и 412и 411и",
    "X416 L412R",

    "L411L L311L",
    "L412R L312R",

    //з
    "L409U X422",
    "X422 32з 33з 34з 35з 36аз 36з 37з 39з 38з 41з 40з 41аз 42з X423",
    "X423 L410U",

    //5
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //з
    "L509U X522",
    "X522 44з 43з 46з 45з 47з 48з 48аз 49з 50з 52з 54з 51з 53з 53аз 55з X523",
    "X523 L510U",

    //и
    "L511L 500и 501и 500аи 502и 503и 504аи 504и 505и X516 506и 506аи 507и 508и",
    "X516 L512R",
    "L511L L411L",
    "L512R L412R",
    
    //6
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //и
    "L611L 600и 600аи 601и 603и 602и 605и 604и 607и",
    "L611L L511L",
];