! function (t) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).jsnes = t()
	}
}((function () {
	return function t(s, i, e) {
		function h(n, a) {
			if (!i[n]) {
				if (!s[n]) {
					var o = "function" == typeof require && require;
					if (!a && o) return o(n, !0);
					if (r) return r(n, !0);
					var l = new Error("Cannot find module '" + n + "'");
					throw l.code = "MODULE_NOT_FOUND", l
				}
				var p = i[n] = {
					exports: {}
				};
				s[n][0].call(p.exports, (function (t) {
					return h(s[n][1][t] || t)
				}), p, p.exports, t, s, i, e)
			}
			return i[n].exports
		}
		for (var r = "function" == typeof require && require, n = 0; n < e.length; n++) h(e[n]);
		return h
	}({
		1: [
			function (t, s, i) {
				var e = function () {
					JSNES.state = new Array(8);
					for (var t = 0; t < JSNES.state.length; t++) JSNES.state[t] = 64
				};
				e.BUTTON_A = 0, e.BUTTON_B = 1, e.BUTTON_SELECT = 2, e.BUTTON_START = 3, e.BUTTON_UP = 4, e.BUTTON_DOWN = 5, e.BUTTON_LEFT = 6, e.BUTTON_RIGHT = 7, e.prototype = {
					buttonDown: function (t) {
						JSNES.state[t] = 65
					},
					buttonUp: function (t) {
						JSNES.state[t] = 64
					}
				}, s.exports = e
			}, {}
		],
		2: [
			function (t, s, i) {
				var e = t("./utils"),
					h = function (t) {
						JSNES.nes = t, JSNES.mem = null, JSNES.REG_ACC = null, JSNES.REG_X = null, JSNES.REG_Y = null, JSNES.REG_SP = null, JSNES.REG_PC = null, JSNES.REG_PC_NEW = null, JSNES.REG_STATUS = null, JSNES.F_CARRY = null, JSNES.F_DECIMAL = null, JSNES.F_INTERRUPT = null, JSNES.F_INTERRUPT_NEW = null, JSNES.F_OVERFLOW = null, JSNES.F_SIGN = null, JSNES.F_ZERO = null, JSNES.F_NOTUSED = null, JSNES.F_NOTUSED_NEW = null, JSNES.F_BRK = null, JSNES.F_BRK_NEW = null, JSNES.opdata = null, JSNES.cyclesToHalt = null, JSNES.crash = null, JSNES.irqRequested = null, JSNES.irqType = null, JSNES.reset()
					};
				h.prototype = {
					IRQ_NORMAL: 0,
					IRQ_NMI: 1,
					IRQ_RESET: 2,
					reset: function () {
						JSNES.mem = new Array(65536);
						for (var t = 0; t < 8192; t++) JSNES.mem[t] = 255;
						for (var s = 0; s < 4; s++) {
							var i = 2048 * s;
							JSNES.mem[i + 8] = 247, JSNES.mem[i + 9] = 239, JSNES.mem[i + 10] = 223, JSNES.mem[i + 15] = 191
						}
						for (var e = 8193; e < JSNES.mem.length; e++) JSNES.mem[e] = 0;
						JSNES.REG_ACC = 0, JSNES.REG_X = 0, JSNES.REG_Y = 0, JSNES.REG_SP = 511, JSNES.REG_PC = 32767, JSNES.REG_PC_NEW = 32767, JSNES.REG_STATUS = 40, JSNES.setStatus(40), JSNES.F_CARRY = 0, JSNES.F_DECIMAL = 0, JSNES.F_INTERRUPT = 1, JSNES.F_INTERRUPT_NEW = 1, JSNES.F_OVERFLOW = 0, JSNES.F_SIGN = 0, JSNES.F_ZERO = 1, JSNES.F_NOTUSED = 1, JSNES.F_NOTUSED_NEW = 1, JSNES.F_BRK = 1, JSNES.F_BRK_NEW = 1, JSNES.opdata = (new r).opdata, JSNES.cyclesToHalt = 0, JSNES.crash = !1, JSNES.irqRequested = !1, JSNES.irqType = null
					},
					emulate: function () {
						var t, s;
						if (JSNES.irqRequested) {
							switch (t = JSNES.F_CARRY | (0 === JSNES.F_ZERO ? 1 : 0) << 1 | JSNES.F_INTERRUPT << 2 | JSNES.F_DECIMAL << 3 | JSNES.F_BRK << 4 | JSNES.F_NOTUSED << 5 | JSNES.F_OVERFLOW << 6 | JSNES.F_SIGN << 7, JSNES.REG_PC_NEW = JSNES.REG_PC, JSNES.F_INTERRUPT_NEW = JSNES.F_INTERRUPT, JSNES.irqType) {
							case 0:
								if (0 !== JSNES.F_INTERRUPT) break;
								JSNES.doIrq(t);
								break;
							case 1:
								JSNES.doNonMaskableInterrupt(t);
								break;
							case 2:
								JSNES.doResetInterrupt()
							}
							JSNES.REG_PC = JSNES.REG_PC_NEW, JSNES.F_INTERRUPT = JSNES.F_INTERRUPT_NEW, JSNES.F_BRK = JSNES.F_BRK_NEW, JSNES.irqRequested = !1
						}
						var i = JSNES.opdata[JSNES.nes.mmap.load(JSNES.REG_PC + 1)],
							e = i >> 24,
							h = 0,
							r = i >> 8 & 255,
							n = JSNES.REG_PC;
						JSNES.REG_PC += i >> 16 & 255;
						var a = 0;
						switch (r) {
						case 0:
							a = JSNES.load(n + 2);
							break;
						case 1:
							a = JSNES.load(n + 2), a += a < 128 ? JSNES.REG_PC : JSNES.REG_PC - 256;
							break;
						case 2:
							break;
						case 3:
							a = JSNES.load16bit(n + 2);
							break;
						case 4:
							a = JSNES.REG_ACC;
							break;
						case 5:
							a = JSNES.REG_PC;
							break;
						case 6:
							a = JSNES.load(n + 2) + JSNES.REG_X & 255;
							break;
						case 7:
							a = JSNES.load(n + 2) + JSNES.REG_Y & 255;
							break;
						case 8:
							(65280 & (a = JSNES.load16bit(n + 2))) != (a + JSNES.REG_X & 65280) && (h = 1), a += JSNES.REG_X;
							break;
						case 9:
							(65280 & (a = JSNES.load16bit(n + 2))) != (a + JSNES.REG_Y & 65280) && (h = 1), a += JSNES.REG_Y;
							break;
						case 10:
							(65280 & (a = JSNES.load(n + 2))) != (a + JSNES.REG_X & 65280) && (h = 1), a += JSNES.REG_X, a &= 255, a = JSNES.load16bit(a);
							break;
						case 11:
							(65280 & (a = JSNES.load16bit(JSNES.load(n + 2)))) != (a + JSNES.REG_Y & 65280) && (h = 1), a += JSNES.REG_Y;
							break;
						case 12:
							a = (a = JSNES.load16bit(n + 2)) < 8191 ? JSNES.mem[a] + (JSNES.mem[65280 & a | 1 + (255 & a) & 255] << 8) : JSNES.nes.mmap.load(a) + (JSNES.nes.mmap.load(65280 & a | 1 + (255 & a) & 255) << 8)
						}
						switch (a &= 65535, 255 & i) {
						case 0:
							t = JSNES.REG_ACC + JSNES.load(a) + JSNES.F_CARRY, 0 == (128 & (JSNES.REG_ACC ^ JSNES.load(a))) && 0 != (128 & (JSNES.REG_ACC ^ t)) ? JSNES.F_OVERFLOW = 1 : JSNES.F_OVERFLOW = 0, JSNES.F_CARRY = t > 255 ? 1 : 0, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, JSNES.REG_ACC = 255 & t, e += h;
							break;
						case 1:
							JSNES.REG_ACC = JSNES.REG_ACC & JSNES.load(a), JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC, 11 !== r && (e += h);
							break;
						case 2:
							4 === r ? (JSNES.F_CARRY = JSNES.REG_ACC >> 7 & 1, JSNES.REG_ACC = JSNES.REG_ACC << 1 & 255, JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC) : (t = JSNES.load(a), JSNES.F_CARRY = t >> 7 & 1, t = t << 1 & 255, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = t, JSNES.write(a, t));
							break;
						case 3:
							0 === JSNES.F_CARRY && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 4:
							1 === JSNES.F_CARRY && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 5:
							0 === JSNES.F_ZERO && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 6:
							t = JSNES.load(a), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_OVERFLOW = t >> 6 & 1, t &= JSNES.REG_ACC, JSNES.F_ZERO = t;
							break;
						case 7:
							1 === JSNES.F_SIGN && (e++, JSNES.REG_PC = a);
							break;
						case 8:
							0 !== JSNES.F_ZERO && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 9:
							0 === JSNES.F_SIGN && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 10:
							JSNES.REG_PC += 2, JSNES.push(JSNES.REG_PC >> 8 & 255), JSNES.push(255 & JSNES.REG_PC), JSNES.F_BRK = 1, JSNES.push(JSNES.F_CARRY | (0 === JSNES.F_ZERO ? 1 : 0) << 1 | JSNES.F_INTERRUPT << 2 | JSNES.F_DECIMAL << 3 | JSNES.F_BRK << 4 | JSNES.F_NOTUSED << 5 | JSNES.F_OVERFLOW << 6 | JSNES.F_SIGN << 7), JSNES.F_INTERRUPT = 1, JSNES.REG_PC = JSNES.load16bit(65534), JSNES.REG_PC--;
							break;
						case 11:
							0 === JSNES.F_OVERFLOW && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 12:
							1 === JSNES.F_OVERFLOW && (e += (65280 & n) != (65280 & a) ? 2 : 1, JSNES.REG_PC = a);
							break;
						case 13:
							JSNES.F_CARRY = 0;
							break;
						case 14:
							JSNES.F_DECIMAL = 0;
							break;
						case 15:
							JSNES.F_INTERRUPT = 0;
							break;
						case 16:
							JSNES.F_OVERFLOW = 0;
							break;
						case 17:
							t = JSNES.REG_ACC - JSNES.load(a), JSNES.F_CARRY = t >= 0 ? 1 : 0, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, e += h;
							break;
						case 18:
							t = JSNES.REG_X - JSNES.load(a), JSNES.F_CARRY = t >= 0 ? 1 : 0, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t;
							break;
						case 19:
							t = JSNES.REG_Y - JSNES.load(a), JSNES.F_CARRY = t >= 0 ? 1 : 0, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t;
							break;
						case 20:
							t = JSNES.load(a) - 1 & 255, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = t, JSNES.write(a, t);
							break;
						case 21:
							JSNES.REG_X = JSNES.REG_X - 1 & 255, JSNES.F_SIGN = JSNES.REG_X >> 7 & 1, JSNES.F_ZERO = JSNES.REG_X;
							break;
						case 22:
							JSNES.REG_Y = JSNES.REG_Y - 1 & 255, JSNES.F_SIGN = JSNES.REG_Y >> 7 & 1, JSNES.F_ZERO = JSNES.REG_Y;
							break;
						case 23:
							JSNES.REG_ACC = 255 & (JSNES.load(a) ^ JSNES.REG_ACC), JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC, e += h;
							break;
						case 24:
							t = JSNES.load(a) + 1 & 255, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = t, JSNES.write(a, 255 & t);
							break;
						case 25:
							JSNES.REG_X = JSNES.REG_X + 1 & 255, JSNES.F_SIGN = JSNES.REG_X >> 7 & 1, JSNES.F_ZERO = JSNES.REG_X;
							break;
						case 26:
							JSNES.REG_Y++, JSNES.REG_Y &= 255, JSNES.F_SIGN = JSNES.REG_Y >> 7 & 1, JSNES.F_ZERO = JSNES.REG_Y;
							break;
						case 27:
							JSNES.REG_PC = a - 1;
							break;
						case 28:
							JSNES.push(JSNES.REG_PC >> 8 & 255), JSNES.push(255 & JSNES.REG_PC), JSNES.REG_PC = a - 1;
							break;
						case 29:
							JSNES.REG_ACC = JSNES.load(a), JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC, e += h;
							break;
						case 30:
							JSNES.REG_X = JSNES.load(a), JSNES.F_SIGN = JSNES.REG_X >> 7 & 1, JSNES.F_ZERO = JSNES.REG_X, e += h;
							break;
						case 31:
							JSNES.REG_Y = JSNES.load(a), JSNES.F_SIGN = JSNES.REG_Y >> 7 & 1, JSNES.F_ZERO = JSNES.REG_Y, e += h;
							break;
						case 32:
							4 === r ? (t = 255 & JSNES.REG_ACC, JSNES.F_CARRY = 1 & t, t >>= 1, JSNES.REG_ACC = t) : (t = 255 & JSNES.load(a), JSNES.F_CARRY = 1 & t, t >>= 1, JSNES.write(a, t)), JSNES.F_SIGN = 0, JSNES.F_ZERO = t;
							break;
						case 33:
							break;
						case 34:
							t = 255 & (JSNES.load(a) | JSNES.REG_ACC), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = t, JSNES.REG_ACC = t, 11 !== r && (e += h);
							break;
						case 35:
							JSNES.push(JSNES.REG_ACC);
							break;
						case 36:
							JSNES.F_BRK = 1, JSNES.push(JSNES.F_CARRY | (0 === JSNES.F_ZERO ? 1 : 0) << 1 | JSNES.F_INTERRUPT << 2 | JSNES.F_DECIMAL << 3 | JSNES.F_BRK << 4 | JSNES.F_NOTUSED << 5 | JSNES.F_OVERFLOW << 6 | JSNES.F_SIGN << 7);
							break;
						case 37:
							JSNES.REG_ACC = JSNES.pull(), JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC;
							break;
						case 38:
							t = JSNES.pull(), JSNES.F_CARRY = 1 & t, JSNES.F_ZERO = 1 == (t >> 1 & 1) ? 0 : 1, JSNES.F_INTERRUPT = t >> 2 & 1, JSNES.F_DECIMAL = t >> 3 & 1, JSNES.F_BRK = t >> 4 & 1, JSNES.F_NOTUSED = t >> 5 & 1, JSNES.F_OVERFLOW = t >> 6 & 1, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_NOTUSED = 1;
							break;
						case 39:
							4 === r ? (t = JSNES.REG_ACC, s = JSNES.F_CARRY, JSNES.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + s, JSNES.REG_ACC = t) : (t = JSNES.load(a), s = JSNES.F_CARRY, JSNES.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + s, JSNES.write(a, t)), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = t;
							break;
						case 40:
							4 === r ? (s = JSNES.F_CARRY << 7, JSNES.F_CARRY = 1 & JSNES.REG_ACC, t = (JSNES.REG_ACC >> 1) + s, JSNES.REG_ACC = t) : (t = JSNES.load(a), s = JSNES.F_CARRY << 7, JSNES.F_CARRY = 1 & t, t = (t >> 1) + s, JSNES.write(a, t)), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = t;
							break;
						case 41:
							if (t = JSNES.pull(), JSNES.F_CARRY = 1 & t, JSNES.F_ZERO = 0 == (t >> 1 & 1) ? 1 : 0, JSNES.F_INTERRUPT = t >> 2 & 1, JSNES.F_DECIMAL = t >> 3 & 1, JSNES.F_BRK = t >> 4 & 1, JSNES.F_NOTUSED = t >> 5 & 1, JSNES.F_OVERFLOW = t >> 6 & 1, JSNES.F_SIGN = t >> 7 & 1, JSNES.REG_PC = JSNES.pull(), JSNES.REG_PC += JSNES.pull() << 8, 65535 === JSNES.REG_PC) return;
							JSNES.REG_PC--, JSNES.F_NOTUSED = 1;
							break;
						case 42:
							if (JSNES.REG_PC = JSNES.pull(), JSNES.REG_PC += JSNES.pull() << 8, 65535 === JSNES.REG_PC) return;
							break;
						case 43:
							t = JSNES.REG_ACC - JSNES.load(a) - (1 - JSNES.F_CARRY), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, 0 != (128 & (JSNES.REG_ACC ^ t)) && 0 != (128 & (JSNES.REG_ACC ^ JSNES.load(a))) ? JSNES.F_OVERFLOW = 1 : JSNES.F_OVERFLOW = 0, JSNES.F_CARRY = t < 0 ? 0 : 1, JSNES.REG_ACC = 255 & t, 11 !== r && (e += h);
							break;
						case 44:
							JSNES.F_CARRY = 1;
							break;
						case 45:
							JSNES.F_DECIMAL = 1;
							break;
						case 46:
							JSNES.F_INTERRUPT = 1;
							break;
						case 47:
							JSNES.write(a, JSNES.REG_ACC);
							break;
						case 48:
							JSNES.write(a, JSNES.REG_X);
							break;
						case 49:
							JSNES.write(a, JSNES.REG_Y);
							break;
						case 50:
							JSNES.REG_X = JSNES.REG_ACC, JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC;
							break;
						case 51:
							JSNES.REG_Y = JSNES.REG_ACC, JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC;
							break;
						case 52:
							JSNES.REG_X = JSNES.REG_SP - 256, JSNES.F_SIGN = JSNES.REG_SP >> 7 & 1, JSNES.F_ZERO = JSNES.REG_X;
							break;
						case 53:
							JSNES.REG_ACC = JSNES.REG_X, JSNES.F_SIGN = JSNES.REG_X >> 7 & 1, JSNES.F_ZERO = JSNES.REG_X;
							break;
						case 54:
							JSNES.REG_SP = JSNES.REG_X + 256, JSNES.stackWrap();
							break;
						case 55:
							JSNES.REG_ACC = JSNES.REG_Y, JSNES.F_SIGN = JSNES.REG_Y >> 7 & 1, JSNES.F_ZERO = JSNES.REG_Y;
							break;
						case 56:
							t = JSNES.REG_ACC & JSNES.load(a), JSNES.F_CARRY = 1 & t, JSNES.REG_ACC = JSNES.F_ZERO = t >> 1, JSNES.F_SIGN = 0;
							break;
						case 57:
							JSNES.REG_ACC = JSNES.F_ZERO = JSNES.REG_ACC & JSNES.load(a), JSNES.F_CARRY = JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1;
							break;
						case 58:
							t = JSNES.REG_ACC & JSNES.load(a), JSNES.REG_ACC = JSNES.F_ZERO = (t >> 1) + (JSNES.F_CARRY << 7), JSNES.F_SIGN = JSNES.F_CARRY, JSNES.F_CARRY = t >> 7 & 1, JSNES.F_OVERFLOW = 1 & (t >> 7 ^ t >> 6);
							break;
						case 59:
							t = (JSNES.REG_X & JSNES.REG_ACC) - JSNES.load(a), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, 0 != (128 & (JSNES.REG_X ^ t)) && 0 != (128 & (JSNES.REG_X ^ JSNES.load(a))) ? JSNES.F_OVERFLOW = 1 : JSNES.F_OVERFLOW = 0, JSNES.F_CARRY = t < 0 ? 0 : 1, JSNES.REG_X = 255 & t;
							break;
						case 60:
							JSNES.REG_ACC = JSNES.REG_X = JSNES.F_ZERO = JSNES.load(a), JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, e += h;
							break;
						case 61:
							JSNES.write(a, JSNES.REG_ACC & JSNES.REG_X);
							break;
						case 62:
							t = JSNES.load(a) - 1 & 255, JSNES.write(a, t), t = JSNES.REG_ACC - t, JSNES.F_CARRY = t >= 0 ? 1 : 0, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, 11 !== r && (e += h);
							break;
						case 63:
							t = JSNES.load(a) + 1 & 255, JSNES.write(a, t), t = JSNES.REG_ACC - t - (1 - JSNES.F_CARRY), JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, 0 != (128 & (JSNES.REG_ACC ^ t)) && 0 != (128 & (JSNES.REG_ACC ^ JSNES.load(a))) ? JSNES.F_OVERFLOW = 1 : JSNES.F_OVERFLOW = 0, JSNES.F_CARRY = t < 0 ? 0 : 1, JSNES.REG_ACC = 255 & t, 11 !== r && (e += h);
							break;
						case 64:
							t = JSNES.load(a), s = JSNES.F_CARRY, JSNES.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + s, JSNES.write(a, t), JSNES.REG_ACC = JSNES.REG_ACC & t, JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC, 11 !== r && (e += h);
							break;
						case 65:
							t = JSNES.load(a), s = JSNES.F_CARRY << 7, JSNES.F_CARRY = 1 & t, t = (t >> 1) + s, JSNES.write(a, t), t = JSNES.REG_ACC + JSNES.load(a) + JSNES.F_CARRY, 0 == (128 & (JSNES.REG_ACC ^ JSNES.load(a))) && 0 != (128 & (JSNES.REG_ACC ^ t)) ? JSNES.F_OVERFLOW = 1 : JSNES.F_OVERFLOW = 0, JSNES.F_CARRY = t > 255 ? 1 : 0, JSNES.F_SIGN = t >> 7 & 1, JSNES.F_ZERO = 255 & t, JSNES.REG_ACC = 255 & t, 11 !== r && (e += h);
							break;
						case 66:
							t = JSNES.load(a), JSNES.F_CARRY = t >> 7 & 1, t = t << 1 & 255, JSNES.write(a, t), JSNES.REG_ACC = JSNES.REG_ACC | t, JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC, 11 !== r && (e += h);
							break;
						case 67:
							t = 255 & JSNES.load(a), JSNES.F_CARRY = 1 & t, t >>= 1, JSNES.write(a, t), JSNES.REG_ACC = JSNES.REG_ACC ^ t, JSNES.F_SIGN = JSNES.REG_ACC >> 7 & 1, JSNES.F_ZERO = JSNES.REG_ACC, 11 !== r && (e += h);
							break;
						case 68:
							break;
						case 69:
							JSNES.load(a), 11 !== r && (e += h);
							break;
						default:
							JSNES.nes.stop(), JSNES.nes.crashMessage = "Game crashed, invalid opcode at address $" + n.toString(16)
						}
						return e
					},
					load: function (t) {
						return t < 8192 ? JSNES.mem[2047 & t] : JSNES.nes.mmap.load(t)
					},
					load16bit: function (t) {
						return t < 8191 ? JSNES.mem[2047 & t] | JSNES.mem[t + 1 & 2047] << 8 : JSNES.nes.mmap.load(t) | JSNES.nes.mmap.load(t + 1) << 8
					},
					write: function (t, s) {
						t < 8192 ? JSNES.mem[2047 & t] = s : JSNES.nes.mmap.write(t, s)
					},
					requestIrq: function (t) {
						JSNES.irqRequested && t === JSNES.IRQ_NORMAL || (JSNES.irqRequested = !0, JSNES.irqType = t)
					},
					push: function (t) {
						JSNES.nes.mmap.write(JSNES.REG_SP, t), JSNES.REG_SP--, JSNES.REG_SP = 256 | 255 & JSNES.REG_SP
					},
					stackWrap: function () {
						JSNES.REG_SP = 256 | 255 & JSNES.REG_SP
					},
					pull: function () {
						return JSNES.REG_SP++, JSNES.REG_SP = 256 | 255 & JSNES.REG_SP, JSNES.nes.mmap.load(JSNES.REG_SP)
					},
					pageCrossed: function (t, s) {
						return (65280 & t) != (65280 & s)
					},
					haltCycles: function (t) {
						JSNES.cyclesToHalt += t
					},
					doNonMaskableInterrupt: function (t) {
						0 != (128 & JSNES.nes.mmap.load(8192)) && (JSNES.REG_PC_NEW++, JSNES.push(JSNES.REG_PC_NEW >> 8 & 255), JSNES.push(255 & JSNES.REG_PC_NEW), JSNES.push(t), JSNES.REG_PC_NEW = JSNES.nes.mmap.load(65530) | JSNES.nes.mmap.load(65531) << 8, JSNES.REG_PC_NEW--)
					},
					doResetInterrupt: function () {
						JSNES.REG_PC_NEW = JSNES.nes.mmap.load(65532) | JSNES.nes.mmap.load(65533) << 8, JSNES.REG_PC_NEW--
					},
					doIrq: function (t) {
						JSNES.REG_PC_NEW++, JSNES.push(JSNES.REG_PC_NEW >> 8 & 255), JSNES.push(255 & JSNES.REG_PC_NEW), JSNES.push(t), JSNES.F_INTERRUPT_NEW = 1, JSNES.F_BRK_NEW = 0, JSNES.REG_PC_NEW = JSNES.nes.mmap.load(65534) | JSNES.nes.mmap.load(65535) << 8, JSNES.REG_PC_NEW--
					},
					getStatus: function () {
						return JSNES.F_CARRY | JSNES.F_ZERO << 1 | JSNES.F_INTERRUPT << 2 | JSNES.F_DECIMAL << 3 | JSNES.F_BRK << 4 | JSNES.F_NOTUSED << 5 | JSNES.F_OVERFLOW << 6 | JSNES.F_SIGN << 7
					},
					setStatus: function (t) {
						JSNES.F_CARRY = 1 & t, JSNES.F_ZERO = t >> 1 & 1, JSNES.F_INTERRUPT = t >> 2 & 1, JSNES.F_DECIMAL = t >> 3 & 1, JSNES.F_BRK = t >> 4 & 1, JSNES.F_NOTUSED = t >> 5 & 1, JSNES.F_OVERFLOW = t >> 6 & 1, JSNES.F_SIGN = t >> 7 & 1
					},
					JSON_PROPERTIES: ["mem", "cyclesToHalt", "irqRequested", "irqType", "REG_ACC", "REG_X", "REG_Y", "REG_SP", "REG_PC", "REG_PC_NEW", "REG_STATUS", "F_CARRY", "F_DECIMAL", "F_INTERRUPT", "F_INTERRUPT_NEW", "F_OVERFLOW", "F_SIGN", "F_ZERO", "F_NOTUSED", "F_NOTUSED_NEW", "F_BRK", "F_BRK_NEW"],
					toJSON: function () {
						return e.toJSON(this)
					},
					fromJSON: function (t) {
						e.fromJSON(this, t)
					}
				};
				var r = function () {
					JSNES.opdata = new Array(256);
					for (var t = 0; t < 256; t++) JSNES.opdata[t] = 255;
					JSNES.setOp(JSNES.INS_ADC, 105, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_ADC, 101, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_ADC, 117, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_ADC, 109, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_ADC, 125, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_ADC, 121, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_ADC, 97, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_ADC, 113, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_AND, 41, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_AND, 37, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_AND, 53, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_AND, 45, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_AND, 61, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_AND, 57, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_AND, 33, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_AND, 49, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_ASL, 10, JSNES.ADDR_ACC, 1, 2), JSNES.setOp(JSNES.INS_ASL, 6, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_ASL, 22, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_ASL, 14, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_ASL, 30, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_BCC, 144, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BCS, 176, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BEQ, 240, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BIT, 36, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_BIT, 44, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_BMI, 48, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BNE, 208, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BPL, 16, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BRK, 0, JSNES.ADDR_IMP, 1, 7), JSNES.setOp(JSNES.INS_BVC, 80, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_BVS, 112, JSNES.ADDR_REL, 2, 2), JSNES.setOp(JSNES.INS_CLC, 24, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_CLD, 216, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_CLI, 88, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_CLV, 184, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_CMP, 201, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_CMP, 197, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_CMP, 213, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_CMP, 205, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_CMP, 221, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_CMP, 217, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_CMP, 193, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_CMP, 209, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_CPX, 224, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_CPX, 228, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_CPX, 236, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_CPY, 192, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_CPY, 196, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_CPY, 204, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_DEC, 198, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_DEC, 214, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_DEC, 206, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_DEC, 222, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_DEX, 202, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_DEY, 136, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_EOR, 73, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_EOR, 69, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_EOR, 85, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_EOR, 77, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_EOR, 93, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_EOR, 89, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_EOR, 65, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_EOR, 81, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_INC, 230, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_INC, 246, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_INC, 238, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_INC, 254, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_INX, 232, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_INY, 200, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_JMP, 76, JSNES.ADDR_ABS, 3, 3), JSNES.setOp(JSNES.INS_JMP, 108, JSNES.ADDR_INDABS, 3, 5), JSNES.setOp(JSNES.INS_JSR, 32, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_LDA, 169, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_LDA, 165, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_LDA, 181, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_LDA, 173, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_LDA, 189, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_LDA, 185, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_LDA, 161, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_LDA, 177, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_LDX, 162, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_LDX, 166, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_LDX, 182, JSNES.ADDR_ZPY, 2, 4), JSNES.setOp(JSNES.INS_LDX, 174, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_LDX, 190, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_LDY, 160, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_LDY, 164, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_LDY, 180, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_LDY, 172, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_LDY, 188, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_LSR, 74, JSNES.ADDR_ACC, 1, 2), JSNES.setOp(JSNES.INS_LSR, 70, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_LSR, 86, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_LSR, 78, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_LSR, 94, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_NOP, 26, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_NOP, 58, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_NOP, 90, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_NOP, 122, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_NOP, 218, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_NOP, 234, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_NOP, 250, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_ORA, 9, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_ORA, 5, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_ORA, 21, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_ORA, 13, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_ORA, 29, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_ORA, 25, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_ORA, 1, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_ORA, 17, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_PHA, 72, JSNES.ADDR_IMP, 1, 3), JSNES.setOp(JSNES.INS_PHP, 8, JSNES.ADDR_IMP, 1, 3), JSNES.setOp(JSNES.INS_PLA, 104, JSNES.ADDR_IMP, 1, 4), JSNES.setOp(JSNES.INS_PLP, 40, JSNES.ADDR_IMP, 1, 4), JSNES.setOp(JSNES.INS_ROL, 42, JSNES.ADDR_ACC, 1, 2), JSNES.setOp(JSNES.INS_ROL, 38, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_ROL, 54, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_ROL, 46, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_ROL, 62, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_ROR, 106, JSNES.ADDR_ACC, 1, 2), JSNES.setOp(JSNES.INS_ROR, 102, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_ROR, 118, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_ROR, 110, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_ROR, 126, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_RTI, 64, JSNES.ADDR_IMP, 1, 6), JSNES.setOp(JSNES.INS_RTS, 96, JSNES.ADDR_IMP, 1, 6), JSNES.setOp(JSNES.INS_SBC, 233, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_SBC, 229, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_SBC, 245, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_SBC, 237, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_SBC, 253, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_SBC, 249, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_SBC, 225, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_SBC, 241, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_SEC, 56, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_SED, 248, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_SEI, 120, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_STA, 133, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_STA, 149, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_STA, 141, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_STA, 157, JSNES.ADDR_ABSX, 3, 5), JSNES.setOp(JSNES.INS_STA, 153, JSNES.ADDR_ABSY, 3, 5), JSNES.setOp(JSNES.INS_STA, 129, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_STA, 145, JSNES.ADDR_POSTIDXIND, 2, 6), JSNES.setOp(JSNES.INS_STX, 134, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_STX, 150, JSNES.ADDR_ZPY, 2, 4), JSNES.setOp(JSNES.INS_STX, 142, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_STY, 132, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_STY, 148, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_STY, 140, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_TAX, 170, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_TAY, 168, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_TSX, 186, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_TXA, 138, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_TXS, 154, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_TYA, 152, JSNES.ADDR_IMP, 1, 2), JSNES.setOp(JSNES.INS_ALR, 75, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_ANC, 11, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_ANC, 43, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_ARR, 107, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_AXS, 203, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_LAX, 163, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_LAX, 167, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_LAX, 175, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_LAX, 179, JSNES.ADDR_POSTIDXIND, 2, 5), JSNES.setOp(JSNES.INS_LAX, 183, JSNES.ADDR_ZPY, 2, 4), JSNES.setOp(JSNES.INS_LAX, 191, JSNES.ADDR_ABSY, 3, 4), JSNES.setOp(JSNES.INS_SAX, 131, JSNES.ADDR_PREIDXIND, 2, 6), JSNES.setOp(JSNES.INS_SAX, 135, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_SAX, 143, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_SAX, 151, JSNES.ADDR_ZPY, 2, 4), JSNES.setOp(JSNES.INS_DCP, 195, JSNES.ADDR_PREIDXIND, 2, 8), JSNES.setOp(JSNES.INS_DCP, 199, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_DCP, 207, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_DCP, 211, JSNES.ADDR_POSTIDXIND, 2, 8), JSNES.setOp(JSNES.INS_DCP, 215, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_DCP, 219, JSNES.ADDR_ABSY, 3, 7), JSNES.setOp(JSNES.INS_DCP, 223, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_ISC, 227, JSNES.ADDR_PREIDXIND, 2, 8), JSNES.setOp(JSNES.INS_ISC, 231, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_ISC, 239, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_ISC, 243, JSNES.ADDR_POSTIDXIND, 2, 8), JSNES.setOp(JSNES.INS_ISC, 247, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_ISC, 251, JSNES.ADDR_ABSY, 3, 7), JSNES.setOp(JSNES.INS_ISC, 255, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_RLA, 35, JSNES.ADDR_PREIDXIND, 2, 8), JSNES.setOp(JSNES.INS_RLA, 39, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_RLA, 47, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_RLA, 51, JSNES.ADDR_POSTIDXIND, 2, 8), JSNES.setOp(JSNES.INS_RLA, 55, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_RLA, 59, JSNES.ADDR_ABSY, 3, 7), JSNES.setOp(JSNES.INS_RLA, 63, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_RRA, 99, JSNES.ADDR_PREIDXIND, 2, 8), JSNES.setOp(JSNES.INS_RRA, 103, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_RRA, 111, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_RRA, 115, JSNES.ADDR_POSTIDXIND, 2, 8), JSNES.setOp(JSNES.INS_RRA, 119, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_RRA, 123, JSNES.ADDR_ABSY, 3, 7), JSNES.setOp(JSNES.INS_RRA, 127, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_SLO, 3, JSNES.ADDR_PREIDXIND, 2, 8), JSNES.setOp(JSNES.INS_SLO, 7, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_SLO, 15, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_SLO, 19, JSNES.ADDR_POSTIDXIND, 2, 8), JSNES.setOp(JSNES.INS_SLO, 23, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_SLO, 27, JSNES.ADDR_ABSY, 3, 7), JSNES.setOp(JSNES.INS_SLO, 31, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_SRE, 67, JSNES.ADDR_PREIDXIND, 2, 8), JSNES.setOp(JSNES.INS_SRE, 71, JSNES.ADDR_ZP, 2, 5), JSNES.setOp(JSNES.INS_SRE, 79, JSNES.ADDR_ABS, 3, 6), JSNES.setOp(JSNES.INS_SRE, 83, JSNES.ADDR_POSTIDXIND, 2, 8), JSNES.setOp(JSNES.INS_SRE, 87, JSNES.ADDR_ZPX, 2, 6), JSNES.setOp(JSNES.INS_SRE, 91, JSNES.ADDR_ABSY, 3, 7), JSNES.setOp(JSNES.INS_SRE, 95, JSNES.ADDR_ABSX, 3, 7), JSNES.setOp(JSNES.INS_SKB, 128, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_SKB, 130, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_SKB, 137, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_SKB, 194, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_SKB, 226, JSNES.ADDR_IMM, 2, 2), JSNES.setOp(JSNES.INS_IGN, 12, JSNES.ADDR_ABS, 3, 4), JSNES.setOp(JSNES.INS_IGN, 28, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_IGN, 60, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_IGN, 92, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_IGN, 124, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_IGN, 220, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_IGN, 252, JSNES.ADDR_ABSX, 3, 4), JSNES.setOp(JSNES.INS_IGN, 4, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_IGN, 68, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_IGN, 100, JSNES.ADDR_ZP, 2, 3), JSNES.setOp(JSNES.INS_IGN, 20, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_IGN, 52, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_IGN, 84, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_IGN, 116, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_IGN, 212, JSNES.ADDR_ZPX, 2, 4), JSNES.setOp(JSNES.INS_IGN, 244, JSNES.ADDR_ZPX, 2, 4), JSNES.cycTable = new Array(7, 6, 2, 8, 3, 3, 5, 5, 3, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 4, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 3, 2, 2, 2, 3, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 4, 2, 2, 2, 5, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 2, 6, 2, 6, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 2, 6, 2, 6, 4, 4, 4, 4, 2, 5, 2, 5, 5, 5, 5, 5, 2, 6, 2, 6, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 2, 5, 2, 5, 4, 4, 4, 4, 2, 4, 2, 4, 4, 4, 4, 4, 2, 6, 2, 8, 3, 3, 5, 5, 2, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 2, 6, 3, 8, 3, 3, 5, 5, 2, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7), JSNES.instname = new Array(70), JSNES.instname[0] = "ADC", JSNES.instname[1] = "AND", JSNES.instname[2] = "ASL", JSNES.instname[3] = "BCC", JSNES.instname[4] = "BCS", JSNES.instname[5] = "BEQ", JSNES.instname[6] = "BIT", JSNES.instname[7] = "BMI", JSNES.instname[8] = "BNE", JSNES.instname[9] = "BPL", JSNES.instname[10] = "BRK", JSNES.instname[11] = "BVC", JSNES.instname[12] = "BVS", JSNES.instname[13] = "CLC", JSNES.instname[14] = "CLD", JSNES.instname[15] = "CLI", JSNES.instname[16] = "CLV", JSNES.instname[17] = "CMP", JSNES.instname[18] = "CPX", JSNES.instname[19] = "CPY", JSNES.instname[20] = "DEC", JSNES.instname[21] = "DEX", JSNES.instname[22] = "DEY", JSNES.instname[23] = "EOR", JSNES.instname[24] = "INC", JSNES.instname[25] = "INX", JSNES.instname[26] = "INY", JSNES.instname[27] = "JMP", JSNES.instname[28] = "JSR", JSNES.instname[29] = "LDA", JSNES.instname[30] = "LDX", JSNES.instname[31] = "LDY", JSNES.instname[32] = "LSR", JSNES.instname[33] = "NOP", JSNES.instname[34] = "ORA", JSNES.instname[35] = "PHA", JSNES.instname[36] = "PHP", JSNES.instname[37] = "PLA", JSNES.instname[38] = "PLP", JSNES.instname[39] = "ROL", JSNES.instname[40] = "ROR", JSNES.instname[41] = "RTI", JSNES.instname[42] = "RTS", JSNES.instname[43] = "SBC", JSNES.instname[44] = "SEC", JSNES.instname[45] = "SED", JSNES.instname[46] = "SEI", JSNES.instname[47] = "STA", JSNES.instname[48] = "STX", JSNES.instname[49] = "STY", JSNES.instname[50] = "TAX", JSNES.instname[51] = "TAY", JSNES.instname[52] = "TSX", JSNES.instname[53] = "TXA", JSNES.instname[54] = "TXS", JSNES.instname[55] = "TYA", JSNES.instname[56] = "ALR", JSNES.instname[57] = "ANC", JSNES.instname[58] = "ARR", JSNES.instname[59] = "AXS", JSNES.instname[60] = "LAX", JSNES.instname[61] = "SAX", JSNES.instname[62] = "DCP", JSNES.instname[63] = "ISC", JSNES.instname[64] = "RLA", JSNES.instname[65] = "RRA", JSNES.instname[66] = "SLO", JSNES.instname[67] = "SRE", JSNES.instname[68] = "SKB", JSNES.instname[69] = "IGN", JSNES.addrDesc = new Array("Zero Page           ", "Relative            ", "Implied             ", "Absolute            ", "Accumulator         ", "Immediate           ", "Zero Page,X         ", "Zero Page,Y         ", "Absolute,X          ", "Absolute,Y          ", "Preindexed Indirect ", "Postindexed Indirect", "Indirect Absolute   ")
				};
				r.prototype = {
					INS_ADC: 0,
					INS_AND: 1,
					INS_ASL: 2,
					INS_BCC: 3,
					INS_BCS: 4,
					INS_BEQ: 5,
					INS_BIT: 6,
					INS_BMI: 7,
					INS_BNE: 8,
					INS_BPL: 9,
					INS_BRK: 10,
					INS_BVC: 11,
					INS_BVS: 12,
					INS_CLC: 13,
					INS_CLD: 14,
					INS_CLI: 15,
					INS_CLV: 16,
					INS_CMP: 17,
					INS_CPX: 18,
					INS_CPY: 19,
					INS_DEC: 20,
					INS_DEX: 21,
					INS_DEY: 22,
					INS_EOR: 23,
					INS_INC: 24,
					INS_INX: 25,
					INS_INY: 26,
					INS_JMP: 27,
					INS_JSR: 28,
					INS_LDA: 29,
					INS_LDX: 30,
					INS_LDY: 31,
					INS_LSR: 32,
					INS_NOP: 33,
					INS_ORA: 34,
					INS_PHA: 35,
					INS_PHP: 36,
					INS_PLA: 37,
					INS_PLP: 38,
					INS_ROL: 39,
					INS_ROR: 40,
					INS_RTI: 41,
					INS_RTS: 42,
					INS_SBC: 43,
					INS_SEC: 44,
					INS_SED: 45,
					INS_SEI: 46,
					INS_STA: 47,
					INS_STX: 48,
					INS_STY: 49,
					INS_TAX: 50,
					INS_TAY: 51,
					INS_TSX: 52,
					INS_TXA: 53,
					INS_TXS: 54,
					INS_TYA: 55,
					INS_ALR: 56,
					INS_ANC: 57,
					INS_ARR: 58,
					INS_AXS: 59,
					INS_LAX: 60,
					INS_SAX: 61,
					INS_DCP: 62,
					INS_ISC: 63,
					INS_RLA: 64,
					INS_RRA: 65,
					INS_SLO: 66,
					INS_SRE: 67,
					INS_SKB: 68,
					INS_IGN: 69,
					INS_DUMMY: 70,
					ADDR_ZP: 0,
					ADDR_REL: 1,
					ADDR_IMP: 2,
					ADDR_ABS: 3,
					ADDR_ACC: 4,
					ADDR_IMM: 5,
					ADDR_ZPX: 6,
					ADDR_ZPY: 7,
					ADDR_ABSX: 8,
					ADDR_ABSY: 9,
					ADDR_PREIDXIND: 10,
					ADDR_POSTIDXIND: 11,
					ADDR_INDABS: 12,
					setOp: function (t, s, i, e, h) {
						JSNES.opdata[s] = 255 & t | (255 & i) << 8 | (255 & e) << 16 | (255 & h) << 24
					}
				}, s.exports = h
			}, {
				"./utils": 10
			}
		],
		3: [
			function (t, s, i) {
				s.exports = {
					Controller: t("./controller"),
					NES: t("./nes")
				}
			}, {
				"./controller": 1,
				"./nes": 5
			}
		],
		4: [
			function (t, s, i) {
				var e = t("./utils"),
					h = {
						0: function (t) {
							this.nes = t
						}
					};
				h[0].prototype = {
					reset: function () {
						JSNES.joy1StrobeState = 0, JSNES.joy2StrobeState = 0, JSNES.joypadLastWrite = 0, JSNES.zapperFired = !1, JSNES.zapperX = null, JSNES.zapperY = null
					},
					write: function (t, s) {
						t < 8192 ? JSNES.nes.cpu.mem[2047 & t] = s : t > 16407 ? (JSNES.nes.cpu.mem[t] = s, t >= 24576 && t < 32768 && JSNES.nes.opts.onBatteryRamWrite(t, s)) : t > 8199 && t < 16384 ? JSNES.regWrite(8192 + (7 & t), s) : JSNES.regWrite(t, s)
					},
					writelow: function (t, s) {
						t < 8192 ? JSNES.nes.cpu.mem[2047 & t] = s : t > 16407 ? JSNES.nes.cpu.mem[t] = s : t > 8199 && t < 16384 ? JSNES.regWrite(8192 + (7 & t), s) : JSNES.regWrite(t, s)
					},
					load: function (t) {
						return (t &= 65535) > 16407 ? JSNES.nes.cpu.mem[t] : t >= 8192 ? JSNES.regLoad(t) : JSNES.nes.cpu.mem[2047 & t]
					},
					regLoad: function (t) {
						switch (t >> 12) {
						case 0:
						case 1:
							break;
						case 2:
						case 3:
							switch (7 & t) {
							case 0:
								return JSNES.nes.cpu.mem[8192];
							case 1:
								return JSNES.nes.cpu.mem[8193];
							case 2:
								return JSNES.nes.ppu.readStatusRegister();
							case 3:
								return 0;
							case 4:
								return JSNES.nes.ppu.sramLoad();
							case 5:
							case 6:
								return 0;
							case 7:
								return JSNES.nes.ppu.vramLoad()
							}
							break;
						case 4:
							switch (t - 16405) {
							case 0:
								return JSNES.nes.papu.readReg(t);
							case 1:
								return JSNES.joy1Read();
							case 2:
								var s;
								return s = null !== JSNES.zapperX && null !== JSNES.zapperY && JSNES.nes.ppu.isPixelWhite(JSNES.zapperX, JSNES.zapperY) ? 0 : 8, JSNES.zapperFired && (s |= 16), 65535 & (JSNES.joy2Read() | s)
							}
						}
						return 0
					},
					regWrite: function (t, s) {
						switch (t) {
						case 8192:
							JSNES.nes.cpu.mem[t] = s, JSNES.nes.ppu.updateControlReg1(s);
							break;
						case 8193:
							JSNES.nes.cpu.mem[t] = s, JSNES.nes.ppu.updateControlReg2(s);
							break;
						case 8195:
							JSNES.nes.ppu.writeSRAMAddress(s);
							break;
						case 8196:
							JSNES.nes.ppu.sramWrite(s);
							break;
						case 8197:
							JSNES.nes.ppu.scrollWrite(s);
							break;
						case 8198:
							JSNES.nes.ppu.writeVRAMAddress(s);
							break;
						case 8199:
							JSNES.nes.ppu.vramWrite(s);
							break;
						case 16404:
							JSNES.nes.ppu.sramDMA(s);
							break;
						case 16405:
							JSNES.nes.papu.writeReg(t, s);
							break;
						case 16406:
							0 == (1 & s) && 1 == (1 & JSNES.joypadLastWrite) && (JSNES.joy1StrobeState = 0, JSNES.joy2StrobeState = 0), JSNES.joypadLastWrite = s;
							break;
						case 16407:
							JSNES.nes.papu.writeReg(t, s);
							break;
						default:
							t >= 16384 && t <= 16407 && JSNES.nes.papu.writeReg(t, s)
						}
					},
					joy1Read: function () {
						var t;
						switch (JSNES.joy1StrobeState) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							t = JSNES.nes.controllers[1].state[JSNES.joy1StrobeState];
							break;
						case 8:
						case 9:
						case 10:
						case 11:
						case 12:
						case 13:
						case 14:
						case 15:
						case 16:
						case 17:
						case 18:
							t = 0;
							break;
						case 19:
							t = 1;
							break;
						default:
							t = 0
						}
						return JSNES.joy1StrobeState++, 24 === JSNES.joy1StrobeState && (JSNES.joy1StrobeState = 0), t
					},
					joy2Read: function () {
						var t;
						switch (JSNES.joy2StrobeState) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							t = JSNES.nes.controllers[2].state[JSNES.joy2StrobeState];
							break;
						case 8:
						case 9:
						case 10:
						case 11:
						case 12:
						case 13:
						case 14:
						case 15:
						case 16:
						case 17:
						case 18:
							t = 0;
							break;
						case 19:
							t = 1;
							break;
						default:
							t = 0
						}
						return JSNES.joy2StrobeState++, 24 === JSNES.joy2StrobeState && (JSNES.joy2StrobeState = 0), t
					},
					loadROM: function () {
						if (!JSNES.nes.rom.valid || JSNES.nes.rom.romCount < 1) throw new Error("NoMapper: Invalid ROM! Unable to load.");
						JSNES.loadPRGROM(), JSNES.loadCHRROM(), JSNES.loadBatteryRam(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
					},
					loadPRGROM: function () {
						JSNES.nes.rom.romCount > 1 ? (JSNES.loadRomBank(0, 32768), JSNES.loadRomBank(1, 49152)) : (JSNES.loadRomBank(0, 32768), JSNES.loadRomBank(0, 49152))
					},
					loadCHRROM: function () {
						JSNES.nes.rom.vromCount > 0 && (1 === JSNES.nes.rom.vromCount ? (JSNES.loadVromBank(0, 0), JSNES.loadVromBank(0, 4096)) : (JSNES.loadVromBank(0, 0), JSNES.loadVromBank(1, 4096)))
					},
					loadBatteryRam: function () {
						if (JSNES.nes.rom.batteryRam) {
							var t = JSNES.nes.rom.batteryRam;
							null !== t && 8192 === t.length && e.copyArrayElements(t, 0, JSNES.nes.cpu.mem, 24576, 8192)
						}
					},
					loadRomBank: function (t, s) {
						t %= JSNES.nes.rom.romCount, e.copyArrayElements(JSNES.nes.rom.rom[t], 0, JSNES.nes.cpu.mem, s, 16384)
					},
					loadVromBank: function (t, s) {
						if (0 !== JSNES.nes.rom.vromCount) {
							JSNES.nes.ppu.triggerRendering(), e.copyArrayElements(JSNES.nes.rom.vrom[t % JSNES.nes.rom.vromCount], 0, JSNES.nes.ppu.vramMem, s, 4096);
							var i = JSNES.nes.rom.vromTile[t % JSNES.nes.rom.vromCount];
							e.copyArrayElements(i, 0, JSNES.nes.ppu.ptTile, s >> 4, 256)
						}
					},
					load32kRomBank: function (t, s) {
						JSNES.loadRomBank(2 * t % JSNES.nes.rom.romCount, s), JSNES.loadRomBank((2 * t + 1) % JSNES.nes.rom.romCount, s + 16384)
					},
					load8kVromBank: function (t, s) {
						0 !== JSNES.nes.rom.vromCount && (JSNES.nes.ppu.triggerRendering(), JSNES.loadVromBank(t % JSNES.nes.rom.vromCount, s), JSNES.loadVromBank((t + 1) % JSNES.nes.rom.vromCount, s + 4096))
					},
					load1kVromBank: function (t, s) {
						if (0 !== JSNES.nes.rom.vromCount) {
							JSNES.nes.ppu.triggerRendering();
							var i = Math.floor(t / 4) % JSNES.nes.rom.vromCount,
								h = t % 4 * 1024;
							e.copyArrayElements(JSNES.nes.rom.vrom[i], h, JSNES.nes.ppu.vramMem, s, 1024);
							for (var r = JSNES.nes.rom.vromTile[i], n = s >> 4, a = 0; a < 64; a++) JSNES.nes.ppu.ptTile[n + a] = r[(t % 4 << 6) + a]
						}
					},
					load2kVromBank: function (t, s) {
						if (0 !== JSNES.nes.rom.vromCount) {
							JSNES.nes.ppu.triggerRendering();
							var i = Math.floor(t / 2) % JSNES.nes.rom.vromCount,
								h = t % 2 * 2048;
							e.copyArrayElements(JSNES.nes.rom.vrom[i], h, JSNES.nes.ppu.vramMem, s, 2048);
							for (var r = JSNES.nes.rom.vromTile[i], n = s >> 4, a = 0; a < 128; a++) JSNES.nes.ppu.ptTile[n + a] = r[(t % 2 << 7) + a]
						}
					},
					load8kRomBank: function (t, s) {
						var i = Math.floor(t / 2) % JSNES.nes.rom.romCount,
							h = t % 2 * 8192;
						e.copyArrayElements(JSNES.nes.rom.rom[i], h, JSNES.nes.cpu.mem, s, 8192)
					},
					clockIrqCounter: function () {},
					latchAccess: function (t) {},
					toJSON: function () {
						return {
							joy1StrobeState: JSNES.joy1StrobeState,
							joy2StrobeState: JSNES.joy2StrobeState,
							joypadLastWrite: JSNES.joypadLastWrite
						}
					},
					fromJSON: function (t) {
						JSNES.joy1StrobeState = t.joy1StrobeState, JSNES.joy2StrobeState = t.joy2StrobeState, JSNES.joypadLastWrite = t.joypadLastWrite
					}
				}, h[1] = function (t) {
					JSNES.nes = t
				}, h[1].prototype = new h[0], h[1].prototype.reset = function () {
					h[0].prototype.reset.apply(this), JSNES.regBuffer = 0, JSNES.regBufferCounter = 0, JSNES.mirroring = 0, JSNES.oneScreenMirroring = 0, JSNES.prgSwitchingArea = 1, JSNES.prgSwitchingSize = 1, JSNES.vromSwitchingSize = 0, JSNES.romSelectionReg0 = 0, JSNES.romSelectionReg1 = 0, JSNES.romBankSelect = 0
				}, h[1].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : 0 != (128 & s) ? (JSNES.regBufferCounter = 0, JSNES.regBuffer = 0, 0 === JSNES.getRegNumber(t) && (JSNES.prgSwitchingArea = 1, JSNES.prgSwitchingSize = 1)) : (JSNES.regBuffer = JSNES.regBuffer & 255 - (1 << JSNES.regBufferCounter) | (1 & s) << JSNES.regBufferCounter, JSNES.regBufferCounter++, 5 === JSNES.regBufferCounter && (JSNES.setReg(JSNES.getRegNumber(t), JSNES.regBuffer), JSNES.regBuffer = 0, JSNES.regBufferCounter = 0))
				}, h[1].prototype.setReg = function (t, s) {
					var i;
					switch (t) {
					case 0:
						(i = 3 & s) !== JSNES.mirroring && (JSNES.mirroring = i, 0 == (2 & JSNES.mirroring) ? JSNES.nes.ppu.setMirroring(JSNES.nes.rom.SINGLESCREEN_MIRRORING) : 0 != (1 & JSNES.mirroring) ? JSNES.nes.ppu.setMirroring(JSNES.nes.rom.HORIZONTAL_MIRRORING) : JSNES.nes.ppu.setMirroring(JSNES.nes.rom.VERTICAL_MIRRORING)), JSNES.prgSwitchingArea = s >> 2 & 1, JSNES.prgSwitchingSize = s >> 3 & 1, JSNES.vromSwitchingSize = s >> 4 & 1;
						break;
					case 1:
						JSNES.romSelectionReg0 = s >> 4 & 1, JSNES.nes.rom.vromCount > 0 && (0 === JSNES.vromSwitchingSize ? 0 === JSNES.romSelectionReg0 ? JSNES.load8kVromBank(15 & s, 0) : JSNES.load8kVromBank(Math.floor(JSNES.nes.rom.vromCount / 2) + (15 & s), 0) : 0 === JSNES.romSelectionReg0 ? JSNES.loadVromBank(15 & s, 0) : JSNES.loadVromBank(Math.floor(JSNES.nes.rom.vromCount / 2) + (15 & s), 0));
						break;
					case 2:
						JSNES.romSelectionReg1 = s >> 4 & 1, JSNES.nes.rom.vromCount > 0 && 1 === JSNES.vromSwitchingSize && (0 === JSNES.romSelectionReg1 ? JSNES.loadVromBank(15 & s, 4096) : JSNES.loadVromBank(Math.floor(JSNES.nes.rom.vromCount / 2) + (15 & s), 4096));
						break;
					default:
						var e;
						i = 15 & s;
						var h = 0;
						JSNES.nes.rom.romCount >= 32 ? 0 === JSNES.vromSwitchingSize ? 1 === JSNES.romSelectionReg0 && (h = 16) : h = (JSNES.romSelectionReg0 | JSNES.romSelectionReg1 << 1) << 3 : JSNES.nes.rom.romCount >= 16 && 1 === JSNES.romSelectionReg0 && (h = 8), 0 === JSNES.prgSwitchingSize ? (e = h + (15 & s), JSNES.load32kRomBank(e, 32768)) : (e = 2 * h + (15 & s), 0 === JSNES.prgSwitchingArea ? JSNES.loadRomBank(e, 49152) : JSNES.loadRomBank(e, 32768))
					}
				}, h[1].prototype.getRegNumber = function (t) {
					return t >= 32768 && t <= 40959 ? 0 : t >= 40960 && t <= 49151 ? 1 : t >= 49152 && t <= 57343 ? 2 : 3
				}, h[1].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("MMC1: Invalid ROM! Unable to load.");
					JSNES.loadRomBank(0, 32768), JSNES.loadRomBank(JSNES.nes.rom.romCount - 1, 49152), JSNES.loadCHRROM(), JSNES.loadBatteryRam(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, h[1].prototype.switchLowHighPrgRom = function (t) {}, h[1].prototype.switch16to32 = function () {}, h[1].prototype.switch32to16 = function () {}, h[1].prototype.toJSON = function () {
					var t = h[0].prototype.toJSON.apply(this);
					return t.mirroring = JSNES.mirroring, t.oneScreenMirroring = JSNES.oneScreenMirroring, t.prgSwitchingArea = JSNES.prgSwitchingArea, t.prgSwitchingSize = JSNES.prgSwitchingSize, t.vromSwitchingSize = JSNES.vromSwitchingSize, t.romSelectionReg0 = JSNES.romSelectionReg0, t.romSelectionReg1 = JSNES.romSelectionReg1, t.romBankSelect = JSNES.romBankSelect, t.regBuffer = JSNES.regBuffer, t.regBufferCounter = JSNES.regBufferCounter, t
				}, h[1].prototype.fromJSON = function (t) {
					h[0].prototype.fromJSON.apply(this, arguments), JSNES.mirroring = t.mirroring, JSNES.oneScreenMirroring = t.oneScreenMirroring, JSNES.prgSwitchingArea = t.prgSwitchingArea, JSNES.prgSwitchingSize = t.prgSwitchingSize, JSNES.vromSwitchingSize = t.vromSwitchingSize, JSNES.romSelectionReg0 = t.romSelectionReg0, JSNES.romSelectionReg1 = t.romSelectionReg1, JSNES.romBankSelect = t.romBankSelect, JSNES.regBuffer = t.regBuffer, JSNES.regBufferCounter = t.regBufferCounter
				}, h[2] = function (t) {
					JSNES.nes = t
				}, h[2].prototype = new h[0], h[2].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : JSNES.loadRomBank(s, 32768)
				}, h[2].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("UNROM: Invalid ROM! Unable to load.");
					JSNES.loadRomBank(0, 32768), JSNES.loadRomBank(JSNES.nes.rom.romCount - 1, 49152), JSNES.loadCHRROM(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, h[3] = function (t) {
					JSNES.nes = t
				}, h[3].prototype = new h[0], h[3].prototype.write = function (t, s) {
					if (t < 32768) h[0].prototype.write.apply(this, arguments);
					else {
						var i = s % (JSNES.nes.rom.vromCount / 2) * 2;
						JSNES.loadVromBank(i, 0), JSNES.loadVromBank(i + 1, 4096), JSNES.load8kVromBank(2 * s, 0)
					}
				}, h[4] = function (t) {
					JSNES.nes = t, JSNES.CMD_SEL_2_1K_VROM_0000 = 0, JSNES.CMD_SEL_2_1K_VROM_0800 = 1, JSNES.CMD_SEL_1K_VROM_1000 = 2, JSNES.CMD_SEL_1K_VROM_1400 = 3, JSNES.CMD_SEL_1K_VROM_1800 = 4, JSNES.CMD_SEL_1K_VROM_1C00 = 5, JSNES.CMD_SEL_ROM_PAGE1 = 6, JSNES.CMD_SEL_ROM_PAGE2 = 7, JSNES.command = null, JSNES.prgAddressSelect = null, JSNES.chrAddressSelect = null, JSNES.pageNumber = null, JSNES.irqCounter = null, JSNES.irqLatchValue = null, JSNES.irqEnable = null, JSNES.prgAddressChanged = !1
				}, h[4].prototype = new h[0], h[4].prototype.write = function (t, s) {
					if (t < 32768) h[0].prototype.write.apply(this, arguments);
					else switch (t) {
					case 32768:
						JSNES.command = 7 & s;
						var i = s >> 6 & 1;
						i !== JSNES.prgAddressSelect && (JSNES.prgAddressChanged = !0), JSNES.prgAddressSelect = i, JSNES.chrAddressSelect = s >> 7 & 1;
						break;
					case 32769:
						JSNES.executeCommand(JSNES.command, s);
						break;
					case 40960:
						0 != (1 & s) ? JSNES.nes.ppu.setMirroring(JSNES.nes.rom.HORIZONTAL_MIRRORING) : JSNES.nes.ppu.setMirroring(JSNES.nes.rom.VERTICAL_MIRRORING);
						break;
					case 40961:
						break;
					case 49152:
						JSNES.irqCounter = s;
						break;
					case 49153:
						JSNES.irqLatchValue = s;
						break;
					case 57344:
						JSNES.irqEnable = 0;
						break;
					case 57345:
						JSNES.irqEnable = 1
					}
				}, h[4].prototype.executeCommand = function (t, s) {
					switch (t) {
					case JSNES.CMD_SEL_2_1K_VROM_0000:
						0 === JSNES.chrAddressSelect ? (JSNES.load1kVromBank(s, 0), JSNES.load1kVromBank(s + 1, 1024)) : (JSNES.load1kVromBank(s, 4096), JSNES.load1kVromBank(s + 1, 5120));
						break;
					case JSNES.CMD_SEL_2_1K_VROM_0800:
						0 === JSNES.chrAddressSelect ? (JSNES.load1kVromBank(s, 2048), JSNES.load1kVromBank(s + 1, 3072)) : (JSNES.load1kVromBank(s, 6144), JSNES.load1kVromBank(s + 1, 7168));
						break;
					case JSNES.CMD_SEL_1K_VROM_1000:
						0 === JSNES.chrAddressSelect ? JSNES.load1kVromBank(s, 4096) : JSNES.load1kVromBank(s, 0);
						break;
					case JSNES.CMD_SEL_1K_VROM_1400:
						0 === JSNES.chrAddressSelect ? JSNES.load1kVromBank(s, 5120) : JSNES.load1kVromBank(s, 1024);
						break;
					case JSNES.CMD_SEL_1K_VROM_1800:
						0 === JSNES.chrAddressSelect ? JSNES.load1kVromBank(s, 6144) : JSNES.load1kVromBank(s, 2048);
						break;
					case JSNES.CMD_SEL_1K_VROM_1C00:
						0 === JSNES.chrAddressSelect ? JSNES.load1kVromBank(s, 7168) : JSNES.load1kVromBank(s, 3072);
						break;
					case JSNES.CMD_SEL_ROM_PAGE1:
						JSNES.prgAddressChanged && (0 === JSNES.prgAddressSelect ? JSNES.load8kRomBank(2 * (JSNES.nes.rom.romCount - 1), 49152) : JSNES.load8kRomBank(2 * (JSNES.nes.rom.romCount - 1), 32768), JSNES.prgAddressChanged = !1), 0 === JSNES.prgAddressSelect ? JSNES.load8kRomBank(s, 32768) : JSNES.load8kRomBank(s, 49152);
						break;
					case JSNES.CMD_SEL_ROM_PAGE2:
						JSNES.load8kRomBank(s, 40960), JSNES.prgAddressChanged && (0 === JSNES.prgAddressSelect ? JSNES.load8kRomBank(2 * (JSNES.nes.rom.romCount - 1), 49152) : JSNES.load8kRomBank(2 * (JSNES.nes.rom.romCount - 1), 32768), JSNES.prgAddressChanged = !1)
					}
				}, h[4].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("MMC3: Invalid ROM! Unable to load.");
					JSNES.load8kRomBank(2 * (JSNES.nes.rom.romCount - 1), 49152), JSNES.load8kRomBank(2 * (JSNES.nes.rom.romCount - 1) + 1, 57344), JSNES.load8kRomBank(0, 32768), JSNES.load8kRomBank(1, 40960), JSNES.loadCHRROM(), JSNES.loadBatteryRam(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, h[4].prototype.clockIrqCounter = function () {
					1 === JSNES.irqEnable && (JSNES.irqCounter--, JSNES.irqCounter < 0 && (JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_NORMAL), JSNES.irqCounter = JSNES.irqLatchValue))
				}, h[4].prototype.toJSON = function () {
					var t = h[0].prototype.toJSON.apply(this);
					return t.command = JSNES.command, t.prgAddressSelect = JSNES.prgAddressSelect, t.chrAddressSelect = JSNES.chrAddressSelect, t.pageNumber = JSNES.pageNumber, t.irqCounter = JSNES.irqCounter, t.irqLatchValue = JSNES.irqLatchValue, t.irqEnable = JSNES.irqEnable, t.prgAddressChanged = JSNES.prgAddressChanged, t
				}, h[4].prototype.fromJSON = function (t) {
					h[0].prototype.fromJSON.apply(this, arguments), JSNES.command = t.command, JSNES.prgAddressSelect = t.prgAddressSelect, JSNES.chrAddressSelect = t.chrAddressSelect, JSNES.pageNumber = t.pageNumber, JSNES.irqCounter = t.irqCounter, JSNES.irqLatchValue = t.irqLatchValue, JSNES.irqEnable = t.irqEnable, JSNES.prgAddressChanged = t.prgAddressChanged
				}, h[5] = function (t) {
					JSNES.nes = t
				}, h[5].prototype = new h[0], h[5].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : JSNES.load8kVromBank(s, 0)
				}, h[5].prototype.write = function (t, s) {
					if (t < 20480) h[0].prototype.write.apply(this, arguments);
					else switch (t) {
					case 20736:
						JSNES.prg_size = 3 & s;
						break;
					case 20737:
						JSNES.chr_size = 3 & s;
						break;
					case 20738:
						JSNES.sram_we_a = 3 & s;
						break;
					case 20739:
						JSNES.sram_we_b = 3 & s;
						break;
					case 20740:
						JSNES.graphic_mode = 3 & s;
						break;
					case 20741:
						JSNES.nametable_mode = s, JSNES.nametable_type[0] = 3 & s, JSNES.load1kVromBank(3 & s, 8192), s >>= 2, JSNES.nametable_type[1] = 3 & s, JSNES.load1kVromBank(3 & s, 9216), s >>= 2, JSNES.nametable_type[2] = 3 & s, JSNES.load1kVromBank(3 & s, 10240), s >>= 2, JSNES.nametable_type[3] = 3 & s, JSNES.load1kVromBank(3 & s, 11264);
						break;
					case 20742:
						JSNES.fill_chr = s;
						break;
					case 20743:
						JSNES.fill_pal = 3 & s;
						break;
					case 20755:
						JSNES.SetBank_SRAM(3, 3 & s);
						break;
					case 20756:
					case 20757:
					case 20758:
					case 20759:
						JSNES.SetBank_CPU(t, s);
						break;
					case 20768:
					case 20769:
					case 20770:
					case 20771:
					case 20772:
					case 20773:
					case 20774:
					case 20775:
						JSNES.chr_mode = 0, JSNES.chr_page[0][7 & t] = s, JSNES.SetBank_PPU();
						break;
					case 20776:
					case 20777:
					case 20778:
					case 20779:
						JSNES.chr_mode = 1, JSNES.chr_page[1][0 + (3 & t)] = s, JSNES.chr_page[1][4 + (3 & t)] = s, JSNES.SetBank_PPU();
						break;
					case 20992:
						JSNES.split_control = s;
						break;
					case 20993:
						JSNES.split_scroll = s;
						break;
					case 20994:
						JSNES.split_page = 63 & s;
						break;
					case 20995:
						JSNES.irq_line = s, JSNES.nes.cpu.ClearIRQ();
						break;
					case 20996:
						JSNES.irq_enable = s, JSNES.nes.cpu.ClearIRQ();
						break;
					case 20997:
						JSNES.mult_a = s;
						break;
					case 20998:
						JSNES.mult_b = s;
						break;
					default:
						t >= 20480 && t <= 20501 ? JSNES.nes.papu.exWrite(t, s) : t >= 23552 && t <= 24575 ? 2 === JSNES.graphic_mode || 3 !== JSNES.graphic_mode && JSNES.irq_status : t >= 24576 && t <= 32767 && 2 === JSNES.sram_we_a && JSNES.sram_we_b
					}
				}, h[5].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("UNROM: Invalid ROM! Unable to load.");
					JSNES.load8kRomBank(2 * JSNES.nes.rom.romCount - 1, 32768), JSNES.load8kRomBank(2 * JSNES.nes.rom.romCount - 1, 40960), JSNES.load8kRomBank(2 * JSNES.nes.rom.romCount - 1, 49152), JSNES.load8kRomBank(2 * JSNES.nes.rom.romCount - 1, 57344), JSNES.loadCHRROM(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, h[7] = function (t) {
					JSNES.nes = t
				}, h[7].prototype = new h[0], h[7].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : (JSNES.load32kRomBank(7 & s, 32768), 16 & s ? JSNES.nes.ppu.setMirroring(JSNES.nes.rom.SINGLESCREEN_MIRRORING2) : JSNES.nes.ppu.setMirroring(JSNES.nes.rom.SINGLESCREEN_MIRRORING))
				}, h[7].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("AOROM: Invalid ROM! Unable to load.");
					JSNES.loadPRGROM(), JSNES.loadCHRROM(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, h[11] = function (t) {
					JSNES.nes = t
				}, h[11].prototype = new h[0], h[11].prototype.write = function (t, s) {
					if (t < 32768) h[0].prototype.write.apply(this, arguments);
					else {
						var i = 2 * (15 & s) % JSNES.nes.rom.romCount,
							e = (2 * (15 & s) + 1) % JSNES.nes.rom.romCount;
						if (JSNES.loadRomBank(i, 32768), JSNES.loadRomBank(e, 49152), JSNES.nes.rom.vromCount > 0) {
							var r = 2 * (s >> 4) % JSNES.nes.rom.vromCount;
							JSNES.loadVromBank(r, 0), JSNES.loadVromBank(r + 1, 4096)
						}
					}
				}, h[34] = function (t) {
					JSNES.nes = t
				}, h[34].prototype = new h[0], h[34].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : JSNES.load32kRomBank(s, 32768)
				}, h[38] = function (t) {
					JSNES.nes = t
				}, h[38].prototype = new h[0], h[38].prototype.write = function (t, s) {
					t < 28672 || t > 32767 ? h[0].prototype.write.apply(this, arguments) : (JSNES.load32kRomBank(3 & s, 32768), JSNES.load8kVromBank(2 * (s >> 2 & 3), 0))
				}, h[66] = function (t) {
					JSNES.nes = t
				}, h[66].prototype = new h[0], h[66].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : (JSNES.load32kRomBank(s >> 4 & 3, 32768), JSNES.load8kVromBank(2 * (3 & s), 0))
				}, h[94] = function (t) {
					JSNES.nes = t
				}, h[94].prototype = new h[0], h[94].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : JSNES.loadRomBank(s >> 2, 32768)
				}, h[94].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("UN1ROM: Invalid ROM! Unable to load.");
					JSNES.loadRomBank(0, 32768), JSNES.loadRomBank(JSNES.nes.rom.romCount - 1, 49152), JSNES.loadCHRROM(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, h[140] = function (t) {
					JSNES.nes = t
				}, h[140].prototype = new h[0], h[140].prototype.write = function (t, s) {
					t < 24576 || t > 32767 ? h[0].prototype.write.apply(this, arguments) : (JSNES.load32kRomBank(s >> 4 & 3, 32768), JSNES.load8kVromBank(2 * (15 & s), 0))
				}, h[180] = function (t) {
					JSNES.nes = t
				}, h[180].prototype = new h[0], h[180].prototype.write = function (t, s) {
					t < 32768 ? h[0].prototype.write.apply(this, arguments) : JSNES.loadRomBank(s, 49152)
				}, h[180].prototype.loadROM = function () {
					if (!JSNES.nes.rom.valid) throw new Error("Mapper 180: Invalid ROM! Unable to load.");
					JSNES.loadRomBank(0, 32768), JSNES.loadRomBank(JSNES.nes.rom.romCount - 1, 49152), JSNES.loadCHRROM(), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_RESET)
				}, s.exports = h
			}, {
				"./utils": 10
			}
		],
		5: [
			function (t, s, i) {
				var e = t("./cpu"),
					h = t("./controller"),
					r = t("./ppu"),
					n = t("./papu"),
					a = t("./rom"),
					o = function (t) {
						var s;
						if (JSNES.opts = {
							ui: JSNES.DummyUI,
							onFrame: function () {},
							onAudioSample: null,
							onStatusUpdate: function () {},
							onBatteryRamWrite: function () {},
							preferredFrameRate: 60,
							emulateSound: !0,
							sampleRate: 44100
						}, void 0 !== t)
							for (s in JSNES.opts) void 0 !== t[s] && (JSNES.opts[s] = t[s]);
						JSNES.frameTime = 1e3 / JSNES.opts.preferredFrameRate, JSNES.ui = {
							writeFrame: JSNES.opts.onFrame,
							updateStatus: JSNES.opts.onStatusUpdate
						}, JSNES.cpu = new e(this), JSNES.ppu = new r(this), JSNES.papu = new n(this), JSNES.mmap = null, JSNES.controllers = {
							1: new h,
							2: new h
						}, JSNES.ui.updateStatus("Ready to load a ROM."), JSNES.frame = JSNES.frame.bind(this), JSNES.buttonDown = JSNES.buttonDown.bind(this), JSNES.buttonUp = JSNES.buttonUp.bind(this), JSNES.zapperMove = JSNES.zapperMove.bind(this), JSNES.zapperFireDown = JSNES.zapperFireDown.bind(this), JSNES.zapperFireUp = JSNES.zapperFireUp.bind(this)
					};
				o.prototype = {
					fpsFrameCount: 0,
					romData: null,
					reset: function () {
						null !== JSNES.mmap && JSNES.mmap.reset(), JSNES.cpu.reset(), JSNES.ppu.reset(), JSNES.papu.reset(), JSNES.lastFpsTime = null, JSNES.fpsFrameCount = 0
					},
					frame: function () {
						JSNES.ppu.startFrame();
						var t = 0,
							s = JSNES.opts.emulateSound,
							i = JSNES.cpu,
							e = JSNES.ppu,
							h = JSNES.papu;
						t: for (;;)
							for (0 === i.cyclesToHalt ? (t = i.emulate(), s && h.clockFrameCounter(t), t *= 3) : i.cyclesToHalt > 8 ? (t = 24, s && h.clockFrameCounter(8), i.cyclesToHalt -= 8) : (t = 3 * i.cyclesToHalt, s && h.clockFrameCounter(i.cyclesToHalt), i.cyclesToHalt = 0); t > 0; t--) {
								if (e.curX === e.spr0HitX && 1 === e.f_spVisibility && e.scanline - 21 === e.spr0HitY && e.setStatusFlag(e.STATUS_SPRITE0HIT, !0), e.requestEndFrame && (e.nmiCounter--, 0 === e.nmiCounter)) {
									e.requestEndFrame = !1, e.startVBlank();
									break t
								}
								e.curX++, 341 === e.curX && (e.curX = 0, e.endScanline())
							}
						JSNES.fpsFrameCount++
					},
					buttonDown: function (t, s) {
						JSNES.controllers[t].buttonDown(s)
					},
					buttonUp: function (t, s) {
						JSNES.controllers[t].buttonUp(s)
					},
					zapperMove: function (t, s) {
						JSNES.mmap && (JSNES.mmap.zapperX = t, JSNES.mmap.zapperY = s)
					},
					zapperFireDown: function () {
						JSNES.mmap && (JSNES.mmap.zapperFired = !0)
					},
					zapperFireUp: function () {
						JSNES.mmap && (JSNES.mmap.zapperFired = !1)
					},
					getFPS: function () {
						var t = +new Date,
							s = null;
						return JSNES.lastFpsTime && (s = JSNES.fpsFrameCount / ((t - JSNES.lastFpsTime) / 1e3)), JSNES.fpsFrameCount = 0, JSNES.lastFpsTime = t, s
					},
					reloadROM: function () {
						null !== JSNES.romData && JSNES.loadROM(JSNES.romData)
					},
					loadROM: function (t) {
						JSNES.rom = new a(this), JSNES.rom.load(t), JSNES.reset(), JSNES.mmap = JSNES.rom.createMapper(), JSNES.mmap.loadROM(), JSNES.ppu.setMirroring(JSNES.rom.getMirroringType()), JSNES.romData = t
					},
					setFramerate: function (t) {
						JSNES.opts.preferredFrameRate = t, JSNES.frameTime = 1e3 / t, JSNES.papu.setSampleRate(JSNES.opts.sampleRate, !1)
					},
					toJSON: function () {
						return {
							romData: JSNES.romData,
							cpu: JSNES.cpu.toJSON(),
							mmap: JSNES.mmap.toJSON(),
							ppu: JSNES.ppu.toJSON()
						}
					},
					fromJSON: function (t) {
						JSNES.loadROM(t.romData), JSNES.cpu.fromJSON(t.cpu), JSNES.mmap.fromJSON(t.mmap), JSNES.ppu.fromJSON(t.ppu)
					}
				}, s.exports = o
			}, {
				"./controller": 1,
				"./cpu": 2,
				"./papu": 6,
				"./ppu": 7,
				"./rom": 8
			}
		],
		6: [
			function (t, s, i) {
				var e = function (t) {
					JSNES.nes = t, JSNES.square1 = new n(this, !0), JSNES.square2 = new n(this, !1), JSNES.triangle = new a(this), JSNES.noise = new r(this), JSNES.dmc = new h(this), JSNES.frameIrqCounter = null, JSNES.frameIrqCounterMax = 4, JSNES.initCounter = 2048, JSNES.channelEnableValue = null, JSNES.sampleRate = 44100, JSNES.lengthLookup = null, JSNES.dmcFreqLookup = null, JSNES.noiseWavelengthLookup = null, JSNES.square_table = null, JSNES.tnd_table = null, JSNES.frameIrqEnabled = !1, JSNES.frameIrqActive = null, JSNES.frameClockNow = null, JSNES.startedPlaying = !1, JSNES.recordOutput = !1, JSNES.initingHardware = !1, JSNES.masterFrameCounter = null, JSNES.derivedFrameCounter = null, JSNES.countSequence = null, JSNES.sampleTimer = null, JSNES.frameTime = null, JSNES.sampleTimerMax = null, JSNES.sampleCount = null, JSNES.triValue = 0, JSNES.smpSquare1 = null, JSNES.smpSquare2 = null, JSNES.smpTriangle = null, JSNES.smpDmc = null, JSNES.accCount = null, JSNES.prevSampleL = 0, JSNES.prevSampleR = 0, JSNES.smpAccumL = 0, JSNES.smpAccumR = 0, JSNES.dacRange = 0, JSNES.dcValue = 0, JSNES.masterVolume = 256, JSNES.stereoPosLSquare1 = null, JSNES.stereoPosLSquare2 = null, JSNES.stereoPosLTriangle = null, JSNES.stereoPosLNoise = null, JSNES.stereoPosLDMC = null, JSNES.stereoPosRSquare1 = null, JSNES.stereoPosRSquare2 = null, JSNES.stereoPosRTriangle = null, JSNES.stereoPosRNoise = null, JSNES.stereoPosRDMC = null, JSNES.extraCycles = null, JSNES.maxSample = null, JSNES.minSample = null, JSNES.panning = [80, 170, 100, 150, 128], JSNES.setPanning(JSNES.panning), JSNES.initLengthLookup(), JSNES.initDmcFrequencyLookup(), JSNES.initNoiseWavelengthLookup(), JSNES.initDACtables();
					for (var s = 0; s < 20; s++) 16 === s ? JSNES.writeReg(16400, 16) : JSNES.writeReg(16384 + s, 0);
					JSNES.reset()
				};
				e.prototype = {
					reset: function () {
						JSNES.sampleRate = JSNES.nes.opts.sampleRate, JSNES.sampleTimerMax = Math.floor(1832727040 * JSNES.nes.opts.preferredFrameRate / (60 * JSNES.sampleRate)), JSNES.frameTime = Math.floor(14915 * JSNES.nes.opts.preferredFrameRate / 60), JSNES.sampleTimer = 0, JSNES.updateChannelEnable(0), JSNES.masterFrameCounter = 0, JSNES.derivedFrameCounter = 0, JSNES.countSequence = 0, JSNES.sampleCount = 0, JSNES.initCounter = 2048, JSNES.frameIrqEnabled = !1, JSNES.initingHardware = !1, JSNES.resetCounter(), JSNES.square1.reset(), JSNES.square2.reset(), JSNES.triangle.reset(), JSNES.noise.reset(), JSNES.dmc.reset(), JSNES.accCount = 0, JSNES.smpSquare1 = 0, JSNES.smpSquare2 = 0, JSNES.smpTriangle = 0, JSNES.smpDmc = 0, JSNES.frameIrqEnabled = !1, JSNES.frameIrqCounterMax = 4, JSNES.channelEnableValue = 255, JSNES.startedPlaying = !1, JSNES.prevSampleL = 0, JSNES.prevSampleR = 0, JSNES.smpAccumL = 0, JSNES.smpAccumR = 0, JSNES.maxSample = -5e5, JSNES.minSample = 5e5
					},
					readReg: function (t) {
						var s = 0;
						return s |= JSNES.square1.getLengthStatus(), s |= JSNES.square2.getLengthStatus() << 1, s |= JSNES.triangle.getLengthStatus() << 2, s |= JSNES.noise.getLengthStatus() << 3, s |= JSNES.dmc.getLengthStatus() << 4, s |= (JSNES.frameIrqActive && JSNES.frameIrqEnabled ? 1 : 0) << 6, s |= JSNES.dmc.getIrqStatus() << 7, JSNES.frameIrqActive = !1, JSNES.dmc.irqGenerated = !1, 65535 & s
					},
					writeReg: function (t, s) {
						t >= 16384 && t < 16388 ? JSNES.square1.writeReg(t, s) : t >= 16388 && t < 16392 ? JSNES.square2.writeReg(t, s) : t >= 16392 && t < 16396 ? JSNES.triangle.writeReg(t, s) : t >= 16396 && t <= 16399 ? JSNES.noise.writeReg(t, s) : 16400 === t ? JSNES.dmc.writeReg(t, s) : 16401 === t ? JSNES.dmc.writeReg(t, s) : 16402 === t ? JSNES.dmc.writeReg(t, s) : 16403 === t ? JSNES.dmc.writeReg(t, s) : 16405 === t ? (JSNES.updateChannelEnable(s), 0 !== s && JSNES.initCounter > 0 && (JSNES.initingHardware = !0), JSNES.dmc.writeReg(t, s)) : 16407 === t && (JSNES.countSequence = s >> 7 & 1, JSNES.masterFrameCounter = 0, JSNES.frameIrqActive = !1, JSNES.frameIrqEnabled = 0 == (s >> 6 & 1), 0 === JSNES.countSequence ? (JSNES.frameIrqCounterMax = 4, JSNES.derivedFrameCounter = 4) : (JSNES.frameIrqCounterMax = 5, JSNES.derivedFrameCounter = 0, JSNES.frameCounterTick()))
					},
					resetCounter: function () {
						0 === JSNES.countSequence ? JSNES.derivedFrameCounter = 4 : JSNES.derivedFrameCounter = 0
					},
					updateChannelEnable: function (t) {
						JSNES.channelEnableValue = 65535 & t, JSNES.square1.setEnabled(0 != (1 & t)), JSNES.square2.setEnabled(0 != (2 & t)), JSNES.triangle.setEnabled(0 != (4 & t)), JSNES.noise.setEnabled(0 != (8 & t)), JSNES.dmc.setEnabled(0 != (16 & t))
					},
					clockFrameCounter: function (t) {
						if (JSNES.initCounter > 0 && JSNES.initingHardware) return JSNES.initCounter -= t, void(JSNES.initCounter <= 0 && (JSNES.initingHardware = !1));
						t += JSNES.extraCycles;
						var s = JSNES.sampleTimerMax - JSNES.sampleTimer;
						t << 10 > s ? (JSNES.extraCycles = (t << 10) - s >> 10, t -= JSNES.extraCycles) : JSNES.extraCycles = 0;
						var i = JSNES.dmc,
							e = JSNES.triangle,
							h = JSNES.square1,
							r = JSNES.square2,
							n = JSNES.noise;
						if (i.isEnabled)
							for (i.shiftCounter -= t << 3; i.shiftCounter <= 0 && i.dmaFrequency > 0;) i.shiftCounter += i.dmaFrequency, i.clockDmc();
						if (e.progTimerMax > 0)
							for (e.progTimerCount -= t; e.progTimerCount <= 0;) e.progTimerCount += e.progTimerMax + 1, e.linearCounter > 0 && e.lengthCounter > 0 && (e.triangleCounter++, e.triangleCounter &= 31, e.isEnabled && (e.triangleCounter >= 16 ? e.sampleValue = 15 & e.triangleCounter : e.sampleValue = 15 - (15 & e.triangleCounter), e.sampleValue <<= 4));
						h.progTimerCount -= t, h.progTimerCount <= 0 && (h.progTimerCount += h.progTimerMax + 1 << 1, h.squareCounter++, h.squareCounter &= 7, h.updateSampleValue()), r.progTimerCount -= t, r.progTimerCount <= 0 && (r.progTimerCount += r.progTimerMax + 1 << 1, r.squareCounter++, r.squareCounter &= 7, r.updateSampleValue());
						var a = t;
						if (n.progTimerCount - a > 0) n.progTimerCount -= a, n.accCount += a, n.accValue += a * n.sampleValue;
						else
							for (; a-- > 0;)--n.progTimerCount <= 0 && n.progTimerMax > 0 && (n.shiftReg <<= 1, n.tmp = 32768 & (n.shiftReg << (0 === n.randomMode ? 1 : 6) ^ n.shiftReg), 0 !== n.tmp ? (n.shiftReg |= 1, n.randomBit = 0, n.sampleValue = 0) : (n.randomBit = 1, n.isEnabled && n.lengthCounter > 0 ? n.sampleValue = n.masterVolume : n.sampleValue = 0), n.progTimerCount += n.progTimerMax), n.accValue += n.sampleValue, n.accCount++;
						JSNES.frameIrqEnabled && JSNES.frameIrqActive && JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_NORMAL), JSNES.masterFrameCounter += t << 1, JSNES.masterFrameCounter >= JSNES.frameTime && (JSNES.masterFrameCounter -= JSNES.frameTime, JSNES.frameCounterTick()), JSNES.accSample(t), JSNES.sampleTimer += t << 10, JSNES.sampleTimer >= JSNES.sampleTimerMax && (JSNES.sample(), JSNES.sampleTimer -= JSNES.sampleTimerMax)
					},
					accSample: function (t) {
						JSNES.triangle.sampleCondition && (JSNES.triValue = Math.floor((JSNES.triangle.progTimerCount << 4) / (JSNES.triangle.progTimerMax + 1)), JSNES.triValue > 16 && (JSNES.triValue = 16), JSNES.triangle.triangleCounter >= 16 && (JSNES.triValue = 16 - JSNES.triValue), JSNES.triValue += JSNES.triangle.sampleValue), 2 === t ? (JSNES.smpTriangle += JSNES.triValue << 1, JSNES.smpDmc += JSNES.dmc.sample << 1, JSNES.smpSquare1 += JSNES.square1.sampleValue << 1, JSNES.smpSquare2 += JSNES.square2.sampleValue << 1, JSNES.accCount += 2) : 4 === t ? (JSNES.smpTriangle += JSNES.triValue << 2, JSNES.smpDmc += JSNES.dmc.sample << 2, JSNES.smpSquare1 += JSNES.square1.sampleValue << 2, JSNES.smpSquare2 += JSNES.square2.sampleValue << 2, JSNES.accCount += 4) : (JSNES.smpTriangle += t * JSNES.triValue, JSNES.smpDmc += t * JSNES.dmc.sample, JSNES.smpSquare1 += t * JSNES.square1.sampleValue, JSNES.smpSquare2 += t * JSNES.square2.sampleValue, JSNES.accCount += t)
					},
					frameCounterTick: function () {
						JSNES.derivedFrameCounter++, JSNES.derivedFrameCounter >= JSNES.frameIrqCounterMax && (JSNES.derivedFrameCounter = 0), 1 !== JSNES.derivedFrameCounter && 3 !== JSNES.derivedFrameCounter || (JSNES.triangle.clockLengthCounter(), JSNES.square1.clockLengthCounter(), JSNES.square2.clockLengthCounter(), JSNES.noise.clockLengthCounter(), JSNES.square1.clockSweep(), JSNES.square2.clockSweep()), JSNES.derivedFrameCounter >= 0 && JSNES.derivedFrameCounter < 4 && (JSNES.square1.clockEnvDecay(), JSNES.square2.clockEnvDecay(), JSNES.noise.clockEnvDecay(), JSNES.triangle.clockLinearCounter()), 3 === JSNES.derivedFrameCounter && 0 === JSNES.countSequence && (JSNES.frameIrqActive = !0)
					},
					sample: function () {
						var t, s;
						JSNES.accCount > 0 ? (JSNES.smpSquare1 <<= 4, JSNES.smpSquare1 = Math.floor(JSNES.smpSquare1 / JSNES.accCount), JSNES.smpSquare2 <<= 4, JSNES.smpSquare2 = Math.floor(JSNES.smpSquare2 / JSNES.accCount), JSNES.smpTriangle = Math.floor(JSNES.smpTriangle / JSNES.accCount), JSNES.smpDmc <<= 4, JSNES.smpDmc = Math.floor(JSNES.smpDmc / JSNES.accCount), JSNES.accCount = 0) : (JSNES.smpSquare1 = JSNES.square1.sampleValue << 4, JSNES.smpSquare2 = JSNES.square2.sampleValue << 4, JSNES.smpTriangle = JSNES.triangle.sampleValue, JSNES.smpDmc = JSNES.dmc.sample << 4);
						var i = Math.floor((JSNES.noise.accValue << 4) / JSNES.noise.accCount);
						JSNES.noise.accValue = i >> 4, JSNES.noise.accCount = 1, t = JSNES.smpSquare1 * JSNES.stereoPosLSquare1 + JSNES.smpSquare2 * JSNES.stereoPosLSquare2 >> 8, s = 3 * JSNES.smpTriangle * JSNES.stereoPosLTriangle + (i << 1) * JSNES.stereoPosLNoise + JSNES.smpDmc * JSNES.stereoPosLDMC >> 8, t >= JSNES.square_table.length && (t = JSNES.square_table.length - 1), s >= JSNES.tnd_table.length && (s = JSNES.tnd_table.length - 1);
						var e = JSNES.square_table[t] + JSNES.tnd_table[s] - JSNES.dcValue;
						t = JSNES.smpSquare1 * JSNES.stereoPosRSquare1 + JSNES.smpSquare2 * JSNES.stereoPosRSquare2 >> 8, s = 3 * JSNES.smpTriangle * JSNES.stereoPosRTriangle + (i << 1) * JSNES.stereoPosRNoise + JSNES.smpDmc * JSNES.stereoPosRDMC >> 8, t >= JSNES.square_table.length && (t = JSNES.square_table.length - 1), s >= JSNES.tnd_table.length && (s = JSNES.tnd_table.length - 1);
						var h = JSNES.square_table[t] + JSNES.tnd_table[s] - JSNES.dcValue,
							r = e - JSNES.prevSampleL;
						JSNES.prevSampleL += r, JSNES.smpAccumL += r - (JSNES.smpAccumL >> 10), e = JSNES.smpAccumL;
						var n = h - JSNES.prevSampleR;
						JSNES.prevSampleR += n, JSNES.smpAccumR += n - (JSNES.smpAccumR >> 10), h = JSNES.smpAccumR, e > JSNES.maxSample && (JSNES.maxSample = e), e < JSNES.minSample && (JSNES.minSample = e), JSNES.nes.opts.onAudioSample && JSNES.nes.opts.onAudioSample(e / 32768, h / 32768), JSNES.smpSquare1 = 0, JSNES.smpSquare2 = 0, JSNES.smpTriangle = 0, JSNES.smpDmc = 0
					},
					getLengthMax: function (t) {
						return JSNES.lengthLookup[t >> 3]
					},
					getDmcFrequency: function (t) {
						return t >= 0 && t < 16 ? JSNES.dmcFreqLookup[t] : 0
					},
					getNoiseWaveLength: function (t) {
						return t >= 0 && t < 16 ? JSNES.noiseWavelengthLookup[t] : 0
					},
					setPanning: function (t) {
						for (var s = 0; s < 5; s++) JSNES.panning[s] = t[s];
						JSNES.updateStereoPos()
					},
					setMasterVolume: function (t) {
						t < 0 && (t = 0), t > 256 && (t = 256), JSNES.masterVolume = t, JSNES.updateStereoPos()
					},
					updateStereoPos: function () {
						JSNES.stereoPosLSquare1 = JSNES.panning[0] * JSNES.masterVolume >> 8, JSNES.stereoPosLSquare2 = JSNES.panning[1] * JSNES.masterVolume >> 8, JSNES.stereoPosLTriangle = JSNES.panning[2] * JSNES.masterVolume >> 8, JSNES.stereoPosLNoise = JSNES.panning[3] * JSNES.masterVolume >> 8, JSNES.stereoPosLDMC = JSNES.panning[4] * JSNES.masterVolume >> 8, JSNES.stereoPosRSquare1 = JSNES.masterVolume - JSNES.stereoPosLSquare1, JSNES.stereoPosRSquare2 = JSNES.masterVolume - JSNES.stereoPosLSquare2, JSNES.stereoPosRTriangle = JSNES.masterVolume - JSNES.stereoPosLTriangle, JSNES.stereoPosRNoise = JSNES.masterVolume - JSNES.stereoPosLNoise, JSNES.stereoPosRDMC = JSNES.masterVolume - JSNES.stereoPosLDMC
					},
					initLengthLookup: function () {
						JSNES.lengthLookup = [10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30]
					},
					initDmcFrequencyLookup: function () {
						JSNES.dmcFreqLookup = new Array(16), JSNES.dmcFreqLookup[0] = 3424, JSNES.dmcFreqLookup[1] = 3040, JSNES.dmcFreqLookup[2] = 2720, JSNES.dmcFreqLookup[3] = 2560, JSNES.dmcFreqLookup[4] = 2288, JSNES.dmcFreqLookup[5] = 2032, JSNES.dmcFreqLookup[6] = 1808, JSNES.dmcFreqLookup[7] = 1712, JSNES.dmcFreqLookup[8] = 1520, JSNES.dmcFreqLookup[9] = 1280, JSNES.dmcFreqLookup[10] = 1136, JSNES.dmcFreqLookup[11] = 1024, JSNES.dmcFreqLookup[12] = 848, JSNES.dmcFreqLookup[13] = 672, JSNES.dmcFreqLookup[14] = 576, JSNES.dmcFreqLookup[15] = 432
					},
					initNoiseWavelengthLookup: function () {
						JSNES.noiseWavelengthLookup = new Array(16), JSNES.noiseWavelengthLookup[0] = 4, JSNES.noiseWavelengthLookup[1] = 8, JSNES.noiseWavelengthLookup[2] = 16, JSNES.noiseWavelengthLookup[3] = 32, JSNES.noiseWavelengthLookup[4] = 64, JSNES.noiseWavelengthLookup[5] = 96, JSNES.noiseWavelengthLookup[6] = 128, JSNES.noiseWavelengthLookup[7] = 160, JSNES.noiseWavelengthLookup[8] = 202, JSNES.noiseWavelengthLookup[9] = 254, JSNES.noiseWavelengthLookup[10] = 380, JSNES.noiseWavelengthLookup[11] = 508, JSNES.noiseWavelengthLookup[12] = 762, JSNES.noiseWavelengthLookup[13] = 1016, JSNES.noiseWavelengthLookup[14] = 2034, JSNES.noiseWavelengthLookup[15] = 4068
					},
					initDACtables: function () {
						var t, s, i, e = 0,
							h = 0;
						for (JSNES.square_table = new Array(512), JSNES.tnd_table = new Array(3264), i = 0; i < 512; i++) t = 95.52 / (8128 / (i / 16) + 100), t *= .98411, t *= 5e4, s = Math.floor(t), JSNES.square_table[i] = s, s > e && (e = s);
						for (i = 0; i < 3264; i++) t = 163.67 / (24329 / (i / 16) + 100), t *= .98411, t *= 5e4, s = Math.floor(t), JSNES.tnd_table[i] = s, s > h && (h = s);
						JSNES.dacRange = e + h, JSNES.dcValue = JSNES.dacRange / 2
					}
				};
				var h = function (t) {
					JSNES.papu = t, JSNES.MODE_NORMAL = 0, JSNES.MODE_LOOP = 1, JSNES.MODE_IRQ = 2, JSNES.isEnabled = null, JSNES.hasSample = null, JSNES.irqGenerated = !1, JSNES.playMode = null, JSNES.dmaFrequency = null, JSNES.dmaCounter = null, JSNES.deltaCounter = null, JSNES.playStartAddress = null, JSNES.playAddress = null, JSNES.playLength = null, JSNES.playLengthCounter = null, JSNES.shiftCounter = null, JSNES.reg4012 = null, JSNES.reg4013 = null, JSNES.sample = null, JSNES.dacLsb = null, JSNES.data = null, JSNES.reset()
				};
				h.prototype = {
					clockDmc: function () {
						JSNES.hasSample && (0 == (1 & JSNES.data) ? JSNES.deltaCounter > 0 && JSNES.deltaCounter-- : JSNES.deltaCounter < 63 && JSNES.deltaCounter++, JSNES.sample = JSNES.isEnabled ? (JSNES.deltaCounter << 1) + JSNES.dacLsb : 0, JSNES.data >>= 1), JSNES.dmaCounter--, JSNES.dmaCounter <= 0 && (JSNES.hasSample = !1, JSNES.endOfSample(), JSNES.dmaCounter = 8), JSNES.irqGenerated && JSNES.papu.nes.cpu.requestIrq(JSNES.papu.nes.cpu.IRQ_NORMAL)
					},
					endOfSample: function () {
						0 === JSNES.playLengthCounter && JSNES.playMode === JSNES.MODE_LOOP && (JSNES.playAddress = JSNES.playStartAddress, JSNES.playLengthCounter = JSNES.playLength), JSNES.playLengthCounter > 0 && (JSNES.nextSample(), 0 === JSNES.playLengthCounter && JSNES.playMode === JSNES.MODE_IRQ && (JSNES.irqGenerated = !0))
					},
					nextSample: function () {
						JSNES.data = JSNES.papu.nes.mmap.load(JSNES.playAddress), JSNES.papu.nes.cpu.haltCycles(4), JSNES.playLengthCounter--, JSNES.playAddress++, JSNES.playAddress > 65535 && (JSNES.playAddress = 32768), JSNES.hasSample = !0
					},
					writeReg: function (t, s) {
						16400 === t ? (s >> 6 == 0 ? JSNES.playMode = JSNES.MODE_NORMAL : 1 == (s >> 6 & 1) ? JSNES.playMode = JSNES.MODE_LOOP : s >> 6 == 2 && (JSNES.playMode = JSNES.MODE_IRQ), 0 == (128 & s) && (JSNES.irqGenerated = !1), JSNES.dmaFrequency = JSNES.papu.getDmcFrequency(15 & s)) : 16401 === t ? (JSNES.deltaCounter = s >> 1 & 63, JSNES.dacLsb = 1 & s, JSNES.sample = (JSNES.deltaCounter << 1) + JSNES.dacLsb) : 16402 === t ? (JSNES.playStartAddress = s << 6 | 49152, JSNES.playAddress = JSNES.playStartAddress, JSNES.reg4012 = s) : 16403 === t ? (JSNES.playLength = 1 + (s << 4), JSNES.playLengthCounter = JSNES.playLength, JSNES.reg4013 = s) : 16405 === t && (0 == (s >> 4 & 1) ? JSNES.playLengthCounter = 0 : (JSNES.playAddress = JSNES.playStartAddress, JSNES.playLengthCounter = JSNES.playLength), JSNES.irqGenerated = !1)
					},
					setEnabled: function (t) {
						!JSNES.isEnabled && t && (JSNES.playLengthCounter = JSNES.playLength), JSNES.isEnabled = t
					},
					getLengthStatus: function () {
						return 0 !== JSNES.playLengthCounter && JSNES.isEnabled ? 1 : 0
					},
					getIrqStatus: function () {
						return JSNES.irqGenerated ? 1 : 0
					},
					reset: function () {
						JSNES.isEnabled = !1, JSNES.irqGenerated = !1, JSNES.playMode = JSNES.MODE_NORMAL, JSNES.dmaFrequency = 0, JSNES.dmaCounter = 0, JSNES.deltaCounter = 0, JSNES.playStartAddress = 0, JSNES.playAddress = 0, JSNES.playLength = 0, JSNES.playLengthCounter = 0, JSNES.sample = 0, JSNES.dacLsb = 0, JSNES.shiftCounter = 0, JSNES.reg4012 = 0, JSNES.reg4013 = 0, JSNES.data = 0
					}
				};
				var r = function (t) {
					JSNES.papu = t, JSNES.isEnabled = null, JSNES.envDecayDisable = null, JSNES.envDecayLoopEnable = null, JSNES.lengthCounterEnable = null, JSNES.envReset = null, JSNES.shiftNow = null, JSNES.lengthCounter = null, JSNES.progTimerCount = null, JSNES.progTimerMax = null, JSNES.envDecayRate = null, JSNES.envDecayCounter = null, JSNES.envVolume = null, JSNES.masterVolume = null, JSNES.shiftReg = 16384, JSNES.randomBit = null, JSNES.randomMode = null, JSNES.sampleValue = null, JSNES.accValue = 0, JSNES.accCount = 1, JSNES.tmp = null, JSNES.reset()
				};
				r.prototype = {
					reset: function () {
						JSNES.progTimerCount = 0, JSNES.progTimerMax = 0, JSNES.isEnabled = !1, JSNES.lengthCounter = 0, JSNES.lengthCounterEnable = !1, JSNES.envDecayDisable = !1, JSNES.envDecayLoopEnable = !1, JSNES.shiftNow = !1, JSNES.envDecayRate = 0, JSNES.envDecayCounter = 0, JSNES.envVolume = 0, JSNES.masterVolume = 0, JSNES.shiftReg = 1, JSNES.randomBit = 0, JSNES.randomMode = 0, JSNES.sampleValue = 0, JSNES.tmp = 0
					},
					clockLengthCounter: function () {
						JSNES.lengthCounterEnable && JSNES.lengthCounter > 0 && (JSNES.lengthCounter--, 0 === JSNES.lengthCounter && JSNES.updateSampleValue())
					},
					clockEnvDecay: function () {
						JSNES.envReset ? (JSNES.envReset = !1, JSNES.envDecayCounter = JSNES.envDecayRate + 1, JSNES.envVolume = 15) : --JSNES.envDecayCounter <= 0 && (JSNES.envDecayCounter = JSNES.envDecayRate + 1, JSNES.envVolume > 0 ? JSNES.envVolume-- : JSNES.envVolume = JSNES.envDecayLoopEnable ? 15 : 0), JSNES.envDecayDisable ? JSNES.masterVolume = JSNES.envDecayRate : JSNES.masterVolume = JSNES.envVolume, JSNES.updateSampleValue()
					},
					updateSampleValue: function () {
						JSNES.isEnabled && JSNES.lengthCounter > 0 && (JSNES.sampleValue = JSNES.randomBit * JSNES.masterVolume)
					},
					writeReg: function (t, s) {
						16396 === t ? (JSNES.envDecayDisable = 0 != (16 & s), JSNES.envDecayRate = 15 & s, JSNES.envDecayLoopEnable = 0 != (32 & s), JSNES.lengthCounterEnable = 0 == (32 & s), JSNES.envDecayDisable ? JSNES.masterVolume = JSNES.envDecayRate : JSNES.masterVolume = JSNES.envVolume) : 16398 === t ? (JSNES.progTimerMax = JSNES.papu.getNoiseWaveLength(15 & s), JSNES.randomMode = s >> 7) : 16399 === t && (JSNES.lengthCounter = JSNES.papu.getLengthMax(248 & s), JSNES.envReset = !0)
					},
					setEnabled: function (t) {
						JSNES.isEnabled = t, t || (JSNES.lengthCounter = 0), JSNES.updateSampleValue()
					},
					getLengthStatus: function () {
						return 0 !== JSNES.lengthCounter && JSNES.isEnabled ? 1 : 0
					}
				};
				var n = function (t, s) {
					JSNES.papu = t, JSNES.dutyLookup = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], JSNES.impLookup = [1, -1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0], JSNES.sqr1 = s, JSNES.isEnabled = null, JSNES.lengthCounterEnable = null, JSNES.sweepActive = null, JSNES.envDecayDisable = null, JSNES.envDecayLoopEnable = null, JSNES.envReset = null, JSNES.sweepCarry = null, JSNES.updateSweepPeriod = null, JSNES.progTimerCount = null, JSNES.progTimerMax = null, JSNES.lengthCounter = null, JSNES.squareCounter = null, JSNES.sweepCounter = null, JSNES.sweepCounterMax = null, JSNES.sweepMode = null, JSNES.sweepShiftAmount = null, JSNES.envDecayRate = null, JSNES.envDecayCounter = null, JSNES.envVolume = null, JSNES.masterVolume = null, JSNES.dutyMode = null, JSNES.sweepResult = null, JSNES.sampleValue = null, JSNES.vol = null, JSNES.reset()
				};
				n.prototype = {
					reset: function () {
						JSNES.progTimerCount = 0, JSNES.progTimerMax = 0, JSNES.lengthCounter = 0, JSNES.squareCounter = 0, JSNES.sweepCounter = 0, JSNES.sweepCounterMax = 0, JSNES.sweepMode = 0, JSNES.sweepShiftAmount = 0, JSNES.envDecayRate = 0, JSNES.envDecayCounter = 0, JSNES.envVolume = 0, JSNES.masterVolume = 0, JSNES.dutyMode = 0, JSNES.vol = 0, JSNES.isEnabled = !1, JSNES.lengthCounterEnable = !1, JSNES.sweepActive = !1, JSNES.sweepCarry = !1, JSNES.envDecayDisable = !1, JSNES.envDecayLoopEnable = !1
					},
					clockLengthCounter: function () {
						JSNES.lengthCounterEnable && JSNES.lengthCounter > 0 && (JSNES.lengthCounter--, 0 === JSNES.lengthCounter && JSNES.updateSampleValue())
					},
					clockEnvDecay: function () {
						JSNES.envReset ? (JSNES.envReset = !1, JSNES.envDecayCounter = JSNES.envDecayRate + 1, JSNES.envVolume = 15) : --JSNES.envDecayCounter <= 0 && (JSNES.envDecayCounter = JSNES.envDecayRate + 1, JSNES.envVolume > 0 ? JSNES.envVolume-- : JSNES.envVolume = JSNES.envDecayLoopEnable ? 15 : 0), JSNES.envDecayDisable ? JSNES.masterVolume = JSNES.envDecayRate : JSNES.masterVolume = JSNES.envVolume, JSNES.updateSampleValue()
					},
					clockSweep: function () {
						--JSNES.sweepCounter <= 0 && (JSNES.sweepCounter = JSNES.sweepCounterMax + 1, JSNES.sweepActive && JSNES.sweepShiftAmount > 0 && JSNES.progTimerMax > 7 && (JSNES.sweepCarry = !1, 0 === JSNES.sweepMode ? (JSNES.progTimerMax += JSNES.progTimerMax >> JSNES.sweepShiftAmount, JSNES.progTimerMax > 4095 && (JSNES.progTimerMax = 4095, JSNES.sweepCarry = !0)) : JSNES.progTimerMax = JSNES.progTimerMax - ((JSNES.progTimerMax >> JSNES.sweepShiftAmount) - (JSNES.sqr1 ? 1 : 0)))), JSNES.updateSweepPeriod && (JSNES.updateSweepPeriod = !1, JSNES.sweepCounter = JSNES.sweepCounterMax + 1)
					},
					updateSampleValue: function () {
						JSNES.isEnabled && JSNES.lengthCounter > 0 && JSNES.progTimerMax > 7 ? 0 === JSNES.sweepMode && JSNES.progTimerMax + (JSNES.progTimerMax >> JSNES.sweepShiftAmount) > 4095 ? JSNES.sampleValue = 0 : JSNES.sampleValue = JSNES.masterVolume * JSNES.dutyLookup[(JSNES.dutyMode << 3) + JSNES.squareCounter] : JSNES.sampleValue = 0
					},
					writeReg: function (t, s) {
						var i = JSNES.sqr1 ? 0 : 4;
						t === 16384 + i ? (JSNES.envDecayDisable = 0 != (16 & s), JSNES.envDecayRate = 15 & s, JSNES.envDecayLoopEnable = 0 != (32 & s), JSNES.dutyMode = s >> 6 & 3, JSNES.lengthCounterEnable = 0 == (32 & s), JSNES.envDecayDisable ? JSNES.masterVolume = JSNES.envDecayRate : JSNES.masterVolume = JSNES.envVolume, JSNES.updateSampleValue()) : t === 16385 + i ? (JSNES.sweepActive = 0 != (128 & s), JSNES.sweepCounterMax = s >> 4 & 7, JSNES.sweepMode = s >> 3 & 1, JSNES.sweepShiftAmount = 7 & s, JSNES.updateSweepPeriod = !0) : t === 16386 + i ? (JSNES.progTimerMax &= 1792, JSNES.progTimerMax |= s) : t === 16387 + i && (JSNES.progTimerMax &= 255, JSNES.progTimerMax |= (7 & s) << 8, JSNES.isEnabled && (JSNES.lengthCounter = JSNES.papu.getLengthMax(248 & s)), JSNES.envReset = !0)
					},
					setEnabled: function (t) {
						JSNES.isEnabled = t, t || (JSNES.lengthCounter = 0), JSNES.updateSampleValue()
					},
					getLengthStatus: function () {
						return 0 !== JSNES.lengthCounter && JSNES.isEnabled ? 1 : 0
					}
				};
				var a = function (t) {
					JSNES.papu = t, JSNES.isEnabled = null, JSNES.sampleCondition = null, JSNES.lengthCounterEnable = null, JSNES.lcHalt = null, JSNES.lcControl = null, JSNES.progTimerCount = null, JSNES.progTimerMax = null, JSNES.triangleCounter = null, JSNES.lengthCounter = null, JSNES.linearCounter = null, JSNES.lcLoadValue = null, JSNES.sampleValue = null, JSNES.tmp = null, JSNES.reset()
				};
				a.prototype = {
					reset: function () {
						JSNES.progTimerCount = 0, JSNES.progTimerMax = 0, JSNES.triangleCounter = 0, JSNES.isEnabled = !1, JSNES.sampleCondition = !1, JSNES.lengthCounter = 0, JSNES.lengthCounterEnable = !1, JSNES.linearCounter = 0, JSNES.lcLoadValue = 0, JSNES.lcHalt = !0, JSNES.lcControl = !1, JSNES.tmp = 0, JSNES.sampleValue = 15
					},
					clockLengthCounter: function () {
						JSNES.lengthCounterEnable && JSNES.lengthCounter > 0 && (JSNES.lengthCounter--, 0 === JSNES.lengthCounter && JSNES.updateSampleCondition())
					},
					clockLinearCounter: function () {
						JSNES.lcHalt ? (JSNES.linearCounter = JSNES.lcLoadValue, JSNES.updateSampleCondition()) : JSNES.linearCounter > 0 && (JSNES.linearCounter--, JSNES.updateSampleCondition()), JSNES.lcControl || (JSNES.lcHalt = !1)
					},
					getLengthStatus: function () {
						return 0 !== JSNES.lengthCounter && JSNES.isEnabled ? 1 : 0
					},
					readReg: function (t) {
						return 0
					},
					writeReg: function (t, s) {
						16392 === t ? (JSNES.lcControl = 0 != (128 & s), JSNES.lcLoadValue = 127 & s, JSNES.lengthCounterEnable = !JSNES.lcControl) : 16394 === t ? (JSNES.progTimerMax &= 1792, JSNES.progTimerMax |= s) : 16395 === t && (JSNES.progTimerMax &= 255, JSNES.progTimerMax |= (7 & s) << 8, JSNES.lengthCounter = JSNES.papu.getLengthMax(248 & s), JSNES.lcHalt = !0), JSNES.updateSampleCondition()
					},
					clockProgrammableTimer: function (t) {
						if (JSNES.progTimerMax > 0)
							for (JSNES.progTimerCount += t; JSNES.progTimerMax > 0 && JSNES.progTimerCount >= JSNES.progTimerMax;) JSNES.progTimerCount -= JSNES.progTimerMax, JSNES.isEnabled && JSNES.lengthCounter > 0 && JSNES.linearCounter > 0 && JSNES.clockTriangleGenerator()
					},
					clockTriangleGenerator: function () {
						JSNES.triangleCounter++, JSNES.triangleCounter &= 31
					},
					setEnabled: function (t) {
						JSNES.isEnabled = t, t || (JSNES.lengthCounter = 0), JSNES.updateSampleCondition()
					},
					updateSampleCondition: function () {
						JSNES.sampleCondition = JSNES.isEnabled && JSNES.progTimerMax > 7 && JSNES.linearCounter > 0 && JSNES.lengthCounter > 0
					}
				}, s.exports = e
			}, {}
		],
		7: [
			function (t, s, i) {
				var e = t("./tile"),
					h = t("./utils"),
					r = function (t) {
						JSNES.nes = t, JSNES.vramMem = null, JSNES.spriteMem = null, JSNES.vramAddress = null, JSNES.vramTmpAddress = null, JSNES.vramBufferedReadValue = null, JSNES.firstWrite = null, JSNES.sramAddress = null, JSNES.currentMirroring = null, JSNES.requestEndFrame = null, JSNES.nmiOk = null, JSNES.dummyCycleToggle = null, JSNES.validTileData = null, JSNES.nmiCounter = null, JSNES.scanlineAlreadyRendered = null, JSNES.f_nmiOnVblank = null, JSNES.f_spriteSize = null, JSNES.f_bgPatternTable = null, JSNES.f_spPatternTable = null, JSNES.f_addrInc = null, JSNES.f_nTblAddress = null, JSNES.f_color = null, JSNES.f_spVisibility = null, JSNES.f_bgVisibility = null, JSNES.f_spClipping = null, JSNES.f_bgClipping = null, JSNES.f_dispType = null, JSNES.cntFV = null, JSNES.cntV = null, JSNES.cntH = null, JSNES.cntVT = null, JSNES.cntHT = null, JSNES.regFV = null, JSNES.regV = null, JSNES.regH = null, JSNES.regVT = null, JSNES.regHT = null, JSNES.regFH = null, JSNES.regS = null, JSNES.curNt = null, JSNES.attrib = null, JSNES.buffer = null, JSNES.bgbuffer = null, JSNES.pixrendered = null, JSNES.validTileData = null, JSNES.scantile = null, JSNES.scanline = null, JSNES.lastRenderedScanline = null, JSNES.curX = null, JSNES.sprX = null, JSNES.sprY = null, JSNES.sprTile = null, JSNES.sprCol = null, JSNES.vertFlip = null, JSNES.horiFlip = null, JSNES.bgPriority = null, JSNES.spr0HitX = null, JSNES.spr0HitY = null, JSNES.hitSpr0 = null, JSNES.sprPalette = null, JSNES.imgPalette = null, JSNES.ptTile = null, JSNES.ntable1 = null, JSNES.currentMirroring = null, JSNES.nameTable = null, JSNES.vramMirrorTable = null, JSNES.palTable = null, JSNES.showSpr0Hit = !1, JSNES.clipToTvSize = !0, JSNES.reset()
					};
				r.prototype = {
					STATUS_VRAMWRITE: 4,
					STATUS_SLSPRITECOUNT: 5,
					STATUS_SPRITE0HIT: 6,
					STATUS_VBLANK: 7,
					reset: function () {
						var t;
						for (JSNES.vramMem = new Array(32768), JSNES.spriteMem = new Array(256), t = 0; t < JSNES.vramMem.length; t++) JSNES.vramMem[t] = 0;
						for (t = 0; t < JSNES.spriteMem.length; t++) JSNES.spriteMem[t] = 0;
						for (JSNES.vramAddress = null, JSNES.vramTmpAddress = null, JSNES.vramBufferedReadValue = 0, JSNES.firstWrite = !0, JSNES.sramAddress = 0, JSNES.currentMirroring = -1, JSNES.requestEndFrame = !1, JSNES.nmiOk = !1, JSNES.dummyCycleToggle = !1, JSNES.validTileData = !1, JSNES.nmiCounter = 0, JSNES.scanlineAlreadyRendered = null, JSNES.f_nmiOnVblank = 0, JSNES.f_spriteSize = 0, JSNES.f_bgPatternTable = 0, JSNES.f_spPatternTable = 0, JSNES.f_addrInc = 0, JSNES.f_nTblAddress = 0, JSNES.f_color = 0, JSNES.f_spVisibility = 0, JSNES.f_bgVisibility = 0, JSNES.f_spClipping = 0, JSNES.f_bgClipping = 0, JSNES.f_dispType = 0, JSNES.cntFV = 0, JSNES.cntV = 0, JSNES.cntH = 0, JSNES.cntVT = 0, JSNES.cntHT = 0, JSNES.regFV = 0, JSNES.regV = 0, JSNES.regH = 0, JSNES.regVT = 0, JSNES.regHT = 0, JSNES.regFH = 0, JSNES.regS = 0, JSNES.curNt = null, JSNES.attrib = new Array(32), JSNES.buffer = new Array(61440), JSNES.bgbuffer = new Array(61440), JSNES.pixrendered = new Array(61440), JSNES.validTileData = null, JSNES.scantile = new Array(32), JSNES.scanline = 0, JSNES.lastRenderedScanline = -1, JSNES.curX = 0, JSNES.sprX = new Array(64), JSNES.sprY = new Array(64), JSNES.sprTile = new Array(64), JSNES.sprCol = new Array(64), JSNES.vertFlip = new Array(64), JSNES.horiFlip = new Array(64), JSNES.bgPriority = new Array(64), JSNES.spr0HitX = 0, JSNES.spr0HitY = 0, JSNES.hitSpr0 = !1, JSNES.sprPalette = new Array(16), JSNES.imgPalette = new Array(16), JSNES.ptTile = new Array(512), t = 0; t < 512; t++) JSNES.ptTile[t] = new e;
						for (JSNES.ntable1 = new Array(4), JSNES.currentMirroring = -1, JSNES.nameTable = new Array(4), t = 0; t < 4; t++) JSNES.nameTable[t] = new n(32, 32, "Nt" + t);
						for (JSNES.vramMirrorTable = new Array(32768), t = 0; t < 32768; t++) JSNES.vramMirrorTable[t] = t;
						JSNES.palTable = new a, JSNES.palTable.loadNTSCPalette(), JSNES.updateControlReg1(0), JSNES.updateControlReg2(0)
					},
					setMirroring: function (t) {
						if (t !== JSNES.currentMirroring) {
							JSNES.currentMirroring = t, JSNES.triggerRendering(), null === JSNES.vramMirrorTable && (JSNES.vramMirrorTable = new Array(32768));
							for (var s = 0; s < 32768; s++) JSNES.vramMirrorTable[s] = s;
							JSNES.defineMirrorRegion(16160, 16128, 32), JSNES.defineMirrorRegion(16192, 16128, 32), JSNES.defineMirrorRegion(16256, 16128, 32), JSNES.defineMirrorRegion(16320, 16128, 32), JSNES.defineMirrorRegion(12288, 8192, 3840), JSNES.defineMirrorRegion(16384, 0, 16384), t === JSNES.nes.rom.HORIZONTAL_MIRRORING ? (JSNES.ntable1[0] = 0, JSNES.ntable1[1] = 0, JSNES.ntable1[2] = 1, JSNES.ntable1[3] = 1, JSNES.defineMirrorRegion(9216, 8192, 1024), JSNES.defineMirrorRegion(11264, 10240, 1024)) : t === JSNES.nes.rom.VERTICAL_MIRRORING ? (JSNES.ntable1[0] = 0, JSNES.ntable1[1] = 1, JSNES.ntable1[2] = 0, JSNES.ntable1[3] = 1, JSNES.defineMirrorRegion(10240, 8192, 1024), JSNES.defineMirrorRegion(11264, 9216, 1024)) : t === JSNES.nes.rom.SINGLESCREEN_MIRRORING ? (JSNES.ntable1[0] = 0, JSNES.ntable1[1] = 0, JSNES.ntable1[2] = 0, JSNES.ntable1[3] = 0, JSNES.defineMirrorRegion(9216, 8192, 1024), JSNES.defineMirrorRegion(10240, 8192, 1024), JSNES.defineMirrorRegion(11264, 8192, 1024)) : t === JSNES.nes.rom.SINGLESCREEN_MIRRORING2 ? (JSNES.ntable1[0] = 1, JSNES.ntable1[1] = 1, JSNES.ntable1[2] = 1, JSNES.ntable1[3] = 1, JSNES.defineMirrorRegion(9216, 9216, 1024), JSNES.defineMirrorRegion(10240, 9216, 1024), JSNES.defineMirrorRegion(11264, 9216, 1024)) : (JSNES.ntable1[0] = 0, JSNES.ntable1[1] = 1, JSNES.ntable1[2] = 2, JSNES.ntable1[3] = 3)
						}
					},
					defineMirrorRegion: function (t, s, i) {
						for (var e = 0; e < i; e++) JSNES.vramMirrorTable[t + e] = s + e
					},
					startVBlank: function () {
						JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_NMI), JSNES.lastRenderedScanline < 239 && JSNES.renderFramePartially(JSNES.lastRenderedScanline + 1, 240 - JSNES.lastRenderedScanline), JSNES.endFrame(), JSNES.lastRenderedScanline = -1
					},
					endScanline: function () {
						switch (JSNES.scanline) {
						case 19:
							JSNES.dummyCycleToggle && (JSNES.curX = 1, JSNES.dummyCycleToggle = !JSNES.dummyCycleToggle);
							break;
						case 20:
							JSNES.setStatusFlag(JSNES.STATUS_VBLANK, !1), JSNES.setStatusFlag(JSNES.STATUS_SPRITE0HIT, !1), JSNES.hitSpr0 = !1, JSNES.spr0HitX = -1, JSNES.spr0HitY = -1, 1 !== JSNES.f_bgVisibility && 1 !== JSNES.f_spVisibility || (JSNES.cntFV = JSNES.regFV, JSNES.cntV = JSNES.regV, JSNES.cntH = JSNES.regH, JSNES.cntVT = JSNES.regVT, JSNES.cntHT = JSNES.regHT, 1 === JSNES.f_bgVisibility && JSNES.renderBgScanline(!1, 0)), 1 === JSNES.f_bgVisibility && 1 === JSNES.f_spVisibility && JSNES.checkSprite0(0), 1 !== JSNES.f_bgVisibility && 1 !== JSNES.f_spVisibility || JSNES.nes.mmap.clockIrqCounter();
							break;
						case 261:
							JSNES.setStatusFlag(JSNES.STATUS_VBLANK, !0), JSNES.requestEndFrame = !0, JSNES.nmiCounter = 9, JSNES.scanline = -1;
							break;
						default:
							JSNES.scanline >= 21 && JSNES.scanline <= 260 && (1 === JSNES.f_bgVisibility && (JSNES.scanlineAlreadyRendered || (JSNES.cntHT = JSNES.regHT, JSNES.cntH = JSNES.regH, JSNES.renderBgScanline(!0, JSNES.scanline + 1 - 21)), JSNES.scanlineAlreadyRendered = !1, JSNES.hitSpr0 || 1 !== JSNES.f_spVisibility || JSNES.sprX[0] >= -7 && JSNES.sprX[0] < 256 && JSNES.sprY[0] + 1 <= JSNES.scanline - 20 && JSNES.sprY[0] + 1 + (0 === JSNES.f_spriteSize ? 8 : 16) >= JSNES.scanline - 20 && JSNES.checkSprite0(JSNES.scanline - 20) && (JSNES.hitSpr0 = !0)), 1 !== JSNES.f_bgVisibility && 1 !== JSNES.f_spVisibility || JSNES.nes.mmap.clockIrqCounter())
						}
						JSNES.scanline++, JSNES.regsToAddress(), JSNES.cntsToAddress()
					},
					startFrame: function () {
						var t = 0;
						if (0 === JSNES.f_dispType) t = JSNES.imgPalette[0];
						else switch (JSNES.f_color) {
						case 0:
							t = 0;
							break;
						case 1:
							t = 65280;
							break;
						case 2:
							t = 16711680;
							break;
						case 3:
							t = 0;
							break;
						case 4:
							t = 255;
							break;
						default:
							t = 0
						}
						var s, i = JSNES.buffer;
						for (s = 0; s < 61440; s++) i[s] = t;
						var e = JSNES.pixrendered;
						for (s = 0; s < e.length; s++) e[s] = 65
					},
					endFrame: function () {
						var t, s, i, e = JSNES.buffer;
						if (JSNES.showSpr0Hit) {
							if (JSNES.sprX[0] >= 0 && JSNES.sprX[0] < 256 && JSNES.sprY[0] >= 0 && JSNES.sprY[0] < 240) {
								for (t = 0; t < 256; t++) e[(JSNES.sprY[0] << 8) + t] = 16733525;
								for (t = 0; t < 240; t++) e[(t << 8) + JSNES.sprX[0]] = 16733525
							}
							if (JSNES.spr0HitX >= 0 && JSNES.spr0HitX < 256 && JSNES.spr0HitY >= 0 && JSNES.spr0HitY < 240) {
								for (t = 0; t < 256; t++) e[(JSNES.spr0HitY << 8) + t] = 5635925;
								for (t = 0; t < 240; t++) e[(t << 8) + JSNES.spr0HitX] = 5635925
							}
						}
						if (JSNES.clipToTvSize || 0 === JSNES.f_bgClipping || 0 === JSNES.f_spClipping)
							for (i = 0; i < 240; i++)
								for (s = 0; s < 8; s++) e[(i << 8) + s] = 0;
						if (JSNES.clipToTvSize)
							for (i = 0; i < 240; i++)
								for (s = 0; s < 8; s++) e[255 + (i << 8) - s] = 0;
						if (JSNES.clipToTvSize)
							for (i = 0; i < 8; i++)
								for (s = 0; s < 256; s++) e[(i << 8) + s] = 0, e[(239 - i << 8) + s] = 0;
						JSNES.nes.ui.writeFrame(e)
					},
					updateControlReg1: function (t) {
						JSNES.triggerRendering(), JSNES.f_nmiOnVblank = t >> 7 & 1, JSNES.f_spriteSize = t >> 5 & 1, JSNES.f_bgPatternTable = t >> 4 & 1, JSNES.f_spPatternTable = t >> 3 & 1, JSNES.f_addrInc = t >> 2 & 1, JSNES.f_nTblAddress = 3 & t, JSNES.regV = t >> 1 & 1, JSNES.regH = 1 & t, JSNES.regS = t >> 4 & 1
					},
					updateControlReg2: function (t) {
						JSNES.triggerRendering(), JSNES.f_color = t >> 5 & 7, JSNES.f_spVisibility = t >> 4 & 1, JSNES.f_bgVisibility = t >> 3 & 1, JSNES.f_spClipping = t >> 2 & 1, JSNES.f_bgClipping = t >> 1 & 1, JSNES.f_dispType = 1 & t, 0 === JSNES.f_dispType && JSNES.palTable.setEmphasis(JSNES.f_color), JSNES.updatePalettes()
					},
					setStatusFlag: function (t, s) {
						var i = 1 << t;
						JSNES.nes.cpu.mem[8194] = JSNES.nes.cpu.mem[8194] & 255 - i | (s ? i : 0)
					},
					readStatusRegister: function () {
						var t = JSNES.nes.cpu.mem[8194];
						return JSNES.firstWrite = !0, JSNES.setStatusFlag(JSNES.STATUS_VBLANK, !1), t
					},
					writeSRAMAddress: function (t) {
						JSNES.sramAddress = t
					},
					sramLoad: function () {
						return JSNES.spriteMem[JSNES.sramAddress]
					},
					sramWrite: function (t) {
						JSNES.spriteMem[JSNES.sramAddress] = t, JSNES.spriteRamWriteUpdate(JSNES.sramAddress, t), JSNES.sramAddress++, JSNES.sramAddress %= 256
					},
					scrollWrite: function (t) {
						JSNES.triggerRendering(), JSNES.firstWrite ? (JSNES.regHT = t >> 3 & 31, JSNES.regFH = 7 & t) : (JSNES.regFV = 7 & t, JSNES.regVT = t >> 3 & 31), JSNES.firstWrite = !JSNES.firstWrite
					},
					writeVRAMAddress: function (t) {
						JSNES.firstWrite ? (JSNES.regFV = t >> 4 & 3, JSNES.regV = t >> 3 & 1, JSNES.regH = t >> 2 & 1, JSNES.regVT = 7 & JSNES.regVT | (3 & t) << 3) : (JSNES.triggerRendering(), JSNES.regVT = 24 & JSNES.regVT | t >> 5 & 7, JSNES.regHT = 31 & t, JSNES.cntFV = JSNES.regFV, JSNES.cntV = JSNES.regV, JSNES.cntH = JSNES.regH, JSNES.cntVT = JSNES.regVT, JSNES.cntHT = JSNES.regHT, JSNES.checkSprite0(JSNES.scanline - 20)), JSNES.firstWrite = !JSNES.firstWrite, JSNES.cntsToAddress(), JSNES.vramAddress < 8192 && JSNES.nes.mmap.latchAccess(JSNES.vramAddress)
					},
					vramLoad: function () {
						var t;
						return JSNES.cntsToAddress(), JSNES.regsToAddress(), JSNES.vramAddress <= 16127 ? (t = JSNES.vramBufferedReadValue, JSNES.vramAddress < 8192 ? JSNES.vramBufferedReadValue = JSNES.vramMem[JSNES.vramAddress] : JSNES.vramBufferedReadValue = JSNES.mirroredLoad(JSNES.vramAddress), JSNES.vramAddress < 8192 && JSNES.nes.mmap.latchAccess(JSNES.vramAddress), JSNES.vramAddress += 1 === JSNES.f_addrInc ? 32 : 1, JSNES.cntsFromAddress(), JSNES.regsFromAddress(), t) : (t = JSNES.mirroredLoad(JSNES.vramAddress), JSNES.vramAddress += 1 === JSNES.f_addrInc ? 32 : 1, JSNES.cntsFromAddress(), JSNES.regsFromAddress(), t)
					},
					vramWrite: function (t) {
						JSNES.triggerRendering(), JSNES.cntsToAddress(), JSNES.regsToAddress(), JSNES.vramAddress >= 8192 ? JSNES.mirroredWrite(JSNES.vramAddress, t) : (JSNES.writeMem(JSNES.vramAddress, t), JSNES.nes.mmap.latchAccess(JSNES.vramAddress)), JSNES.vramAddress += 1 === JSNES.f_addrInc ? 32 : 1, JSNES.regsFromAddress(), JSNES.cntsFromAddress()
					},
					sramDMA: function (t) {
						for (var s, i = 256 * t, e = JSNES.sramAddress; e < 256; e++) s = JSNES.nes.cpu.mem[i + e], JSNES.spriteMem[e] = s, JSNES.spriteRamWriteUpdate(e, s);
						JSNES.nes.cpu.haltCycles(513)
					},
					regsFromAddress: function () {
						var t = JSNES.vramTmpAddress >> 8 & 255;
						JSNES.regFV = t >> 4 & 7, JSNES.regV = t >> 3 & 1, JSNES.regH = t >> 2 & 1, JSNES.regVT = 7 & JSNES.regVT | (3 & t) << 3, t = 255 & JSNES.vramTmpAddress, JSNES.regVT = 24 & JSNES.regVT | t >> 5 & 7, JSNES.regHT = 31 & t
					},
					cntsFromAddress: function () {
						var t = JSNES.vramAddress >> 8 & 255;
						JSNES.cntFV = t >> 4 & 3, JSNES.cntV = t >> 3 & 1, JSNES.cntH = t >> 2 & 1, JSNES.cntVT = 7 & JSNES.cntVT | (3 & t) << 3, t = 255 & JSNES.vramAddress, JSNES.cntVT = 24 & JSNES.cntVT | t >> 5 & 7, JSNES.cntHT = 31 & t
					},
					regsToAddress: function () {
						var t = (7 & JSNES.regFV) << 4;
						t |= (1 & JSNES.regV) << 3, t |= (1 & JSNES.regH) << 2, t |= JSNES.regVT >> 3 & 3;
						var s = (7 & JSNES.regVT) << 5;
						s |= 31 & JSNES.regHT, JSNES.vramTmpAddress = 32767 & (t << 8 | s)
					},
					cntsToAddress: function () {
						var t = (7 & JSNES.cntFV) << 4;
						t |= (1 & JSNES.cntV) << 3, t |= (1 & JSNES.cntH) << 2, t |= JSNES.cntVT >> 3 & 3;
						var s = (7 & JSNES.cntVT) << 5;
						s |= 31 & JSNES.cntHT, JSNES.vramAddress = 32767 & (t << 8 | s)
					},
					incTileCounter: function (t) {
						for (var s = t; 0 !== s; s--) JSNES.cntHT++, 32 === JSNES.cntHT && (JSNES.cntHT = 0, JSNES.cntVT++, JSNES.cntVT >= 30 && (JSNES.cntH++, 2 === JSNES.cntH && (JSNES.cntH = 0, JSNES.cntV++, 2 === JSNES.cntV && (JSNES.cntV = 0, JSNES.cntFV++, JSNES.cntFV &= 7))))
					},
					mirroredLoad: function (t) {
						return JSNES.vramMem[JSNES.vramMirrorTable[t]]
					},
					mirroredWrite: function (t, s) {
						if (t >= 16128 && t < 16160) 16128 === t || 16144 === t ? (JSNES.writeMem(16128, s), JSNES.writeMem(16144, s)) : 16132 === t || 16148 === t ? (JSNES.writeMem(16132, s), JSNES.writeMem(16148, s)) : 16136 === t || 16152 === t ? (JSNES.writeMem(16136, s), JSNES.writeMem(16152, s)) : 16140 === t || 16156 === t ? (JSNES.writeMem(16140, s), JSNES.writeMem(16156, s)) : JSNES.writeMem(t, s);
						else {
							if (!(t < JSNES.vramMirrorTable.length)) throw new Error("Invalid VRAM address: " + t.toString(16));
							JSNES.writeMem(JSNES.vramMirrorTable[t], s)
						}
					},
					triggerRendering: function () {
						JSNES.scanline >= 21 && JSNES.scanline <= 260 && (JSNES.renderFramePartially(JSNES.lastRenderedScanline + 1, JSNES.scanline - 21 - JSNES.lastRenderedScanline), JSNES.lastRenderedScanline = JSNES.scanline - 21)
					},
					renderFramePartially: function (t, s) {
						if (1 === JSNES.f_spVisibility && JSNES.renderSpritesPartially(t, s, !0), 1 === JSNES.f_bgVisibility) {
							var i = t << 8,
								e = t + s << 8;
							e > 61440 && (e = 61440);
							for (var h = JSNES.buffer, r = JSNES.bgbuffer, n = JSNES.pixrendered, a = i; a < e; a++) n[a] > 255 && (h[a] = r[a])
						}
						1 === JSNES.f_spVisibility && JSNES.renderSpritesPartially(t, s, !1), JSNES.validTileData = !1
					},
					renderBgScanline: function (t, s) {
						var i = 0 === JSNES.regS ? 0 : 256,
							e = (s << 8) - JSNES.regFH;
						if (JSNES.curNt = JSNES.ntable1[JSNES.cntV + JSNES.cntV + JSNES.cntH], JSNES.cntHT = JSNES.regHT, JSNES.cntH = JSNES.regH, JSNES.curNt = JSNES.ntable1[JSNES.cntV + JSNES.cntV + JSNES.cntH], s < 240 && s - JSNES.cntFV >= 0) {
							for (var h, r, n, a, o = JSNES.cntFV << 3, l = JSNES.scantile, p = JSNES.attrib, u = JSNES.ptTile, m = JSNES.nameTable, R = JSNES.imgPalette, c = JSNES.pixrendered, _ = t ? JSNES.bgbuffer : JSNES.buffer, d = 0; d < 32; d++) {
								if (s >= 0) {
									if (JSNES.validTileData) {
										if (void 0 === (h = l[d])) continue;
										r = h.pix, n = p[d]
									} else {
										if (void 0 === (h = u[i + m[JSNES.curNt].getTileIndex(JSNES.cntHT, JSNES.cntVT)])) continue;
										r = h.pix, n = m[JSNES.curNt].getAttrib(JSNES.cntHT, JSNES.cntVT), l[d] = h, p[d] = n
									}
									var S = 0,
										A = (d << 3) - JSNES.regFH;
									if (A > -8)
										if (A < 0 && (e -= A, S = -A), h.opaque[JSNES.cntFV])
											for (; S < 8; S++) _[e] = R[r[o + S] + n], c[e] |= 256, e++;
										else
											for (; S < 8; S++) 0 !== (a = r[o + S]) && (_[e] = R[a + n], c[e] |= 256), e++
								}
								32 == ++JSNES.cntHT && (JSNES.cntHT = 0, JSNES.cntH++, JSNES.cntH %= 2, JSNES.curNt = JSNES.ntable1[(JSNES.cntV << 1) + JSNES.cntH])
							}
							JSNES.validTileData = !0
						}
						JSNES.cntFV++, 8 === JSNES.cntFV && (JSNES.cntFV = 0, JSNES.cntVT++, 30 === JSNES.cntVT ? (JSNES.cntVT = 0, JSNES.cntV++, JSNES.cntV %= 2, JSNES.curNt = JSNES.ntable1[(JSNES.cntV << 1) + JSNES.cntH]) : 32 === JSNES.cntVT && (JSNES.cntVT = 0), JSNES.validTileData = !1)
					},
					renderSpritesPartially: function (t, s, i) {
						if (1 === JSNES.f_spVisibility)
							for (var e = 0; e < 64; e++)
								if (JSNES.bgPriority[e] === i && JSNES.sprX[e] >= 0 && JSNES.sprX[e] < 256 && JSNES.sprY[e] + 8 >= t && JSNES.sprY[e] < t + s)
									if (0 === JSNES.f_spriteSize) JSNES.srcy1 = 0, JSNES.srcy2 = 8, JSNES.sprY[e] < t && (JSNES.srcy1 = t - JSNES.sprY[e] - 1), JSNES.sprY[e] + 8 > t + s && (JSNES.srcy2 = t + s - JSNES.sprY[e] + 1), 0 === JSNES.f_spPatternTable ? JSNES.ptTile[JSNES.sprTile[e]].render(JSNES.buffer, 0, JSNES.srcy1, 8, JSNES.srcy2, JSNES.sprX[e], JSNES.sprY[e] + 1, JSNES.sprCol[e], JSNES.sprPalette, JSNES.horiFlip[e], JSNES.vertFlip[e], e, JSNES.pixrendered) : JSNES.ptTile[JSNES.sprTile[e] + 256].render(JSNES.buffer, 0, JSNES.srcy1, 8, JSNES.srcy2, JSNES.sprX[e], JSNES.sprY[e] + 1, JSNES.sprCol[e], JSNES.sprPalette, JSNES.horiFlip[e], JSNES.vertFlip[e], e, JSNES.pixrendered);
									else {
										var h = JSNES.sprTile[e];
										0 != (1 & h) && (h = JSNES.sprTile[e] - 1 + 256);
										var r = 0,
											n = 8;
										JSNES.sprY[e] < t && (r = t - JSNES.sprY[e] - 1), JSNES.sprY[e] + 8 > t + s && (n = t + s - JSNES.sprY[e]), JSNES.ptTile[h + (JSNES.vertFlip[e] ? 1 : 0)].render(JSNES.buffer, 0, r, 8, n, JSNES.sprX[e], JSNES.sprY[e] + 1, JSNES.sprCol[e], JSNES.sprPalette, JSNES.horiFlip[e], JSNES.vertFlip[e], e, JSNES.pixrendered), r = 0, n = 8, JSNES.sprY[e] + 8 < t && (r = t - (JSNES.sprY[e] + 8 + 1)), JSNES.sprY[e] + 16 > t + s && (n = t + s - (JSNES.sprY[e] + 8)), JSNES.ptTile[h + (JSNES.vertFlip[e] ? 0 : 1)].render(JSNES.buffer, 0, r, 8, n, JSNES.sprX[e], JSNES.sprY[e] + 1 + 8, JSNES.sprCol[e], JSNES.sprPalette, JSNES.horiFlip[e], JSNES.vertFlip[e], e, JSNES.pixrendered)
									}
					},
					checkSprite0: function (t) {
						var s;
						JSNES.spr0HitX = -1, JSNES.spr0HitY = -1;
						var i, e, h, r, n, a = 0 === JSNES.f_spPatternTable ? 0 : 256;
						if (i = JSNES.sprX[0], e = JSNES.sprY[0] + 1, 0 === JSNES.f_spriteSize) {
							if (e <= t && e + 8 > t && i >= -7 && i < 256)
								if (h = JSNES.ptTile[JSNES.sprTile[0] + a], s = JSNES.vertFlip[0] ? 7 - (t - e) : t - e, s *= 8, n = 256 * t + i, JSNES.horiFlip[0])
									for (r = 7; r >= 0; r--) {
										if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== JSNES.pixrendered[n] && 0 !== h.pix[s + r]) return JSNES.spr0HitX = n % 256, JSNES.spr0HitY = t, !0;
										i++, n++
									} else
										for (r = 0; r < 8; r++) {
											if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== JSNES.pixrendered[n] && 0 !== h.pix[s + r]) return JSNES.spr0HitX = n % 256, JSNES.spr0HitY = t, !0;
											i++, n++
										}
						} else if (e <= t && e + 16 > t && i >= -7 && i < 256)
							if ((s = JSNES.vertFlip[0] ? 15 - (t - e) : t - e) < 8 ? h = JSNES.ptTile[JSNES.sprTile[0] + (JSNES.vertFlip[0] ? 1 : 0) + (0 != (1 & JSNES.sprTile[0]) ? 255 : 0)] : (h = JSNES.ptTile[JSNES.sprTile[0] + (JSNES.vertFlip[0] ? 0 : 1) + (0 != (1 & JSNES.sprTile[0]) ? 255 : 0)], JSNES.vertFlip[0] ? s = 15 - s : s -= 8), s *= 8, n = 256 * t + i, JSNES.horiFlip[0])
								for (r = 7; r >= 0; r--) {
									if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== JSNES.pixrendered[n] && 0 !== h.pix[s + r]) return JSNES.spr0HitX = n % 256, JSNES.spr0HitY = t, !0;
									i++, n++
								} else
									for (r = 0; r < 8; r++) {
										if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== JSNES.pixrendered[n] && 0 !== h.pix[s + r]) return JSNES.spr0HitX = n % 256, JSNES.spr0HitY = t, !0;
										i++, n++
									}
							return !1
					},
					writeMem: function (t, s) {
						JSNES.vramMem[t] = s, t < 8192 ? (JSNES.vramMem[t] = s, JSNES.patternWrite(t, s)) : t >= 8192 && t < 9152 ? JSNES.nameTableWrite(JSNES.ntable1[0], t - 8192, s) : t >= 9152 && t < 9216 ? JSNES.attribTableWrite(JSNES.ntable1[0], t - 9152, s) : t >= 9216 && t < 10176 ? JSNES.nameTableWrite(JSNES.ntable1[1], t - 9216, s) : t >= 10176 && t < 10240 ? JSNES.attribTableWrite(JSNES.ntable1[1], t - 10176, s) : t >= 10240 && t < 11200 ? JSNES.nameTableWrite(JSNES.ntable1[2], t - 10240, s) : t >= 11200 && t < 11264 ? JSNES.attribTableWrite(JSNES.ntable1[2], t - 11200, s) : t >= 11264 && t < 12224 ? JSNES.nameTableWrite(JSNES.ntable1[3], t - 11264, s) : t >= 12224 && t < 12288 ? JSNES.attribTableWrite(JSNES.ntable1[3], t - 12224, s) : t >= 16128 && t < 16160 && JSNES.updatePalettes()
					},
					updatePalettes: function () {
						var t;
						for (t = 0; t < 16; t++) 0 === JSNES.f_dispType ? JSNES.imgPalette[t] = JSNES.palTable.getEntry(63 & JSNES.vramMem[16128 + t]) : JSNES.imgPalette[t] = JSNES.palTable.getEntry(32 & JSNES.vramMem[16128 + t]);
						for (t = 0; t < 16; t++) 0 === JSNES.f_dispType ? JSNES.sprPalette[t] = JSNES.palTable.getEntry(63 & JSNES.vramMem[16144 + t]) : JSNES.sprPalette[t] = JSNES.palTable.getEntry(32 & JSNES.vramMem[16144 + t])
					},
					patternWrite: function (t, s) {
						var i = Math.floor(t / 16),
							e = t % 16;
						e < 8 ? JSNES.ptTile[i].setScanline(e, s, JSNES.vramMem[t + 8]) : JSNES.ptTile[i].setScanline(e - 8, JSNES.vramMem[t - 8], s)
					},
					nameTableWrite: function (t, s, i) {
						JSNES.nameTable[t].tile[s] = i, JSNES.checkSprite0(JSNES.scanline - 20)
					},
					attribTableWrite: function (t, s, i) {
						JSNES.nameTable[t].writeAttrib(s, i)
					},
					spriteRamWriteUpdate: function (t, s) {
						var i = Math.floor(t / 4);
						0 === i && JSNES.checkSprite0(JSNES.scanline - 20), t % 4 == 0 ? JSNES.sprY[i] = s : t % 4 == 1 ? JSNES.sprTile[i] = s : t % 4 == 2 ? (JSNES.vertFlip[i] = 0 != (128 & s), JSNES.horiFlip[i] = 0 != (64 & s), JSNES.bgPriority[i] = 0 != (32 & s), JSNES.sprCol[i] = (3 & s) << 2) : t % 4 == 3 && (JSNES.sprX[i] = s)
					},
					doNMI: function () {
						JSNES.setStatusFlag(JSNES.STATUS_VBLANK, !0), JSNES.nes.cpu.requestIrq(JSNES.nes.cpu.IRQ_NMI)
					},
					isPixelWhite: function (t, s) {
						return JSNES.triggerRendering(), 16777215 === JSNES.nes.ppu.buffer[(s << 8) + t]
					},
					JSON_PROPERTIES: ["vramMem", "spriteMem", "cntFV", "cntV", "cntH", "cntVT", "cntHT", "regFV", "regV", "regH", "regVT", "regHT", "regFH", "regS", "vramAddress", "vramTmpAddress", "f_nmiOnVblank", "f_spriteSize", "f_bgPatternTable", "f_spPatternTable", "f_addrInc", "f_nTblAddress", "f_color", "f_spVisibility", "f_bgVisibility", "f_spClipping", "f_bgClipping", "f_dispType", "vramBufferedReadValue", "firstWrite", "currentMirroring", "vramMirrorTable", "ntable1", "sramAddress", "hitSpr0", "sprPalette", "imgPalette", "curX", "scanline", "lastRenderedScanline", "curNt", "scantile", "attrib", "buffer", "bgbuffer", "pixrendered", "requestEndFrame", "nmiOk", "dummyCycleToggle", "nmiCounter", "validTileData", "scanlineAlreadyRendered"],
					toJSON: function () {
						var t, s = h.toJSON(this);
						for (s.nameTable = [], t = 0; t < JSNES.nameTable.length; t++) s.nameTable[t] = JSNES.nameTable[t].toJSON();
						for (s.ptTile = [], t = 0; t < JSNES.ptTile.length; t++) s.ptTile[t] = JSNES.ptTile[t].toJSON();
						return s
					},
					fromJSON: function (t) {
						var s;
						for (h.fromJSON(this, t), s = 0; s < JSNES.nameTable.length; s++) JSNES.nameTable[s].fromJSON(t.nameTable[s]);
						for (s = 0; s < JSNES.ptTile.length; s++) JSNES.ptTile[s].fromJSON(t.ptTile[s]);
						for (s = 0; s < JSNES.spriteMem.length; s++) JSNES.spriteRamWriteUpdate(s, JSNES.spriteMem[s])
					}
				};
				var n = function (t, s, i) {
					JSNES.width = t, JSNES.height = s, JSNES.name = i, JSNES.tile = new Array(t * s), JSNES.attrib = new Array(t * s);
					for (var e = 0; e < t * s; e++) JSNES.tile[e] = 0, JSNES.attrib[e] = 0
				};
				n.prototype = {
					getTileIndex: function (t, s) {
						return JSNES.tile[s * JSNES.width + t]
					},
					getAttrib: function (t, s) {
						return JSNES.attrib[s * JSNES.width + t]
					},
					writeAttrib: function (t, s) {
						for (var i, e, h, r = t % 8 * 4, n = 4 * Math.floor(t / 8), a = 0; a < 2; a++)
							for (var o = 0; o < 2; o++) {
								i = s >> 2 * (2 * a + o) & 3;
								for (var l = 0; l < 2; l++)
									for (var p = 0; p < 2; p++) e = r + 2 * o + p, h = (n + 2 * a + l) * JSNES.width + e, JSNES.attrib[h] = i << 2 & 12
							}
					},
					toJSON: function () {
						return {
							tile: JSNES.tile,
							attrib: JSNES.attrib
						}
					},
					fromJSON: function (t) {
						JSNES.tile = t.tile, JSNES.attrib = t.attrib
					}
				};
				var a = function () {
					JSNES.curTable = new Array(64), JSNES.emphTable = new Array(8), JSNES.currentEmph = -1
				};
				a.prototype = {
					reset: function () {
						JSNES.setEmphasis(0)
					},
					loadNTSCPalette: function () {
						JSNES.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], JSNES.makeTables(), JSNES.setEmphasis(0)
					},
					loadPALPalette: function () {
						JSNES.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], JSNES.makeTables(), JSNES.setEmphasis(0)
					},
					makeTables: function () {
						for (var t, s, i, e, h, r, n, a, o = 0; o < 8; o++)
							for (r = 1, n = 1, a = 1, 0 != (1 & o) && (r = .75, a = .75), 0 != (2 & o) && (r = .75, n = .75), 0 != (4 & o) && (n = .75, a = .75), JSNES.emphTable[o] = new Array(64), h = 0; h < 64; h++) e = JSNES.curTable[h], t = Math.floor(JSNES.getRed(e) * r), s = Math.floor(JSNES.getGreen(e) * n), i = Math.floor(JSNES.getBlue(e) * a), JSNES.emphTable[o][h] = JSNES.getRgb(t, s, i)
					},
					setEmphasis: function (t) {
						if (t !== JSNES.currentEmph) {
							JSNES.currentEmph = t;
							for (var s = 0; s < 64; s++) JSNES.curTable[s] = JSNES.emphTable[t][s]
						}
					},
					getEntry: function (t) {
						return JSNES.curTable[t]
					},
					getRed: function (t) {
						return t >> 16 & 255
					},
					getGreen: function (t) {
						return t >> 8 & 255
					},
					getBlue: function (t) {
						return 255 & t
					},
					getRgb: function (t, s, i) {
						return t << 16 | s << 8 | i
					},
					loadDefaultPalette: function () {
						JSNES.curTable[0] = JSNES.getRgb(117, 117, 117), JSNES.curTable[1] = JSNES.getRgb(39, 27, 143), JSNES.curTable[2] = JSNES.getRgb(0, 0, 171), JSNES.curTable[3] = JSNES.getRgb(71, 0, 159), JSNES.curTable[4] = JSNES.getRgb(143, 0, 119), JSNES.curTable[5] = JSNES.getRgb(171, 0, 19), JSNES.curTable[6] = JSNES.getRgb(167, 0, 0), JSNES.curTable[7] = JSNES.getRgb(127, 11, 0), JSNES.curTable[8] = JSNES.getRgb(67, 47, 0), JSNES.curTable[9] = JSNES.getRgb(0, 71, 0), JSNES.curTable[10] = JSNES.getRgb(0, 81, 0), JSNES.curTable[11] = JSNES.getRgb(0, 63, 23), JSNES.curTable[12] = JSNES.getRgb(27, 63, 95), JSNES.curTable[13] = JSNES.getRgb(0, 0, 0), JSNES.curTable[14] = JSNES.getRgb(0, 0, 0), JSNES.curTable[15] = JSNES.getRgb(0, 0, 0), JSNES.curTable[16] = JSNES.getRgb(188, 188, 188), JSNES.curTable[17] = JSNES.getRgb(0, 115, 239), JSNES.curTable[18] = JSNES.getRgb(35, 59, 239), JSNES.curTable[19] = JSNES.getRgb(131, 0, 243), JSNES.curTable[20] = JSNES.getRgb(191, 0, 191), JSNES.curTable[21] = JSNES.getRgb(231, 0, 91), JSNES.curTable[22] = JSNES.getRgb(219, 43, 0), JSNES.curTable[23] = JSNES.getRgb(203, 79, 15), JSNES.curTable[24] = JSNES.getRgb(139, 115, 0), JSNES.curTable[25] = JSNES.getRgb(0, 151, 0), JSNES.curTable[26] = JSNES.getRgb(0, 171, 0), JSNES.curTable[27] = JSNES.getRgb(0, 147, 59), JSNES.curTable[28] = JSNES.getRgb(0, 131, 139), JSNES.curTable[29] = JSNES.getRgb(0, 0, 0), JSNES.curTable[30] = JSNES.getRgb(0, 0, 0), JSNES.curTable[31] = JSNES.getRgb(0, 0, 0), JSNES.curTable[32] = JSNES.getRgb(255, 255, 255), JSNES.curTable[33] = JSNES.getRgb(63, 191, 255), JSNES.curTable[34] = JSNES.getRgb(95, 151, 255), JSNES.curTable[35] = JSNES.getRgb(167, 139, 253), JSNES.curTable[36] = JSNES.getRgb(247, 123, 255), JSNES.curTable[37] = JSNES.getRgb(255, 119, 183), JSNES.curTable[38] = JSNES.getRgb(255, 119, 99), JSNES.curTable[39] = JSNES.getRgb(255, 155, 59), JSNES.curTable[40] = JSNES.getRgb(243, 191, 63), JSNES.curTable[41] = JSNES.getRgb(131, 211, 19), JSNES.curTable[42] = JSNES.getRgb(79, 223, 75), JSNES.curTable[43] = JSNES.getRgb(88, 248, 152), JSNES.curTable[44] = JSNES.getRgb(0, 235, 219), JSNES.curTable[45] = JSNES.getRgb(0, 0, 0), JSNES.curTable[46] = JSNES.getRgb(0, 0, 0), JSNES.curTable[47] = JSNES.getRgb(0, 0, 0), JSNES.curTable[48] = JSNES.getRgb(255, 255, 255), JSNES.curTable[49] = JSNES.getRgb(171, 231, 255), JSNES.curTable[50] = JSNES.getRgb(199, 215, 255), JSNES.curTable[51] = JSNES.getRgb(215, 203, 255), JSNES.curTable[52] = JSNES.getRgb(255, 199, 255), JSNES.curTable[53] = JSNES.getRgb(255, 199, 219), JSNES.curTable[54] = JSNES.getRgb(255, 191, 179), JSNES.curTable[55] = JSNES.getRgb(255, 219, 171), JSNES.curTable[56] = JSNES.getRgb(255, 231, 163), JSNES.curTable[57] = JSNES.getRgb(227, 255, 163), JSNES.curTable[58] = JSNES.getRgb(171, 243, 191), JSNES.curTable[59] = JSNES.getRgb(179, 255, 207), JSNES.curTable[60] = JSNES.getRgb(159, 255, 243), JSNES.curTable[61] = JSNES.getRgb(0, 0, 0), JSNES.curTable[62] = JSNES.getRgb(0, 0, 0), JSNES.curTable[63] = JSNES.getRgb(0, 0, 0), JSNES.makeTables(), JSNES.setEmphasis(0)
					}
				}, s.exports = r
			}, {
				"./tile": 9,
				"./utils": 10
			}
		],
		8: [
			function (t, s, i) {
				var e = t("./mappers"),
					h = t("./tile"),
					r = function (t) {
						JSNES.nes = t, JSNES.mapperName = new Array(92);
						for (var s = 0; s < 92; s++) JSNES.mapperName[s] = "Unknown Mapper";
						JSNES.mapperName[0] = "Direct Access", JSNES.mapperName[1] = "Nintendo MMC1", JSNES.mapperName[2] = "UNROM", JSNES.mapperName[3] = "CNROM", JSNES.mapperName[4] = "Nintendo MMC3", JSNES.mapperName[5] = "Nintendo MMC5", JSNES.mapperName[6] = "FFE F4xxx", JSNES.mapperName[7] = "AOROM", JSNES.mapperName[8] = "FFE F3xxx", JSNES.mapperName[9] = "Nintendo MMC2", JSNES.mapperName[10] = "Nintendo MMC4", JSNES.mapperName[11] = "Color Dreams Chip", JSNES.mapperName[12] = "FFE F6xxx", JSNES.mapperName[15] = "100-in-1 switch", JSNES.mapperName[16] = "Bandai chip", JSNES.mapperName[17] = "FFE F8xxx", JSNES.mapperName[18] = "Jaleco SS8806 chip", JSNES.mapperName[19] = "Namcot 106 chip", JSNES.mapperName[20] = "Famicom Disk System", JSNES.mapperName[21] = "Konami VRC4a", JSNES.mapperName[22] = "Konami VRC2a", JSNES.mapperName[23] = "Konami VRC2a", JSNES.mapperName[24] = "Konami VRC6", JSNES.mapperName[25] = "Konami VRC4b", JSNES.mapperName[32] = "Irem G-101 chip", JSNES.mapperName[33] = "Taito TC0190/TC0350", JSNES.mapperName[34] = "32kB ROM switch", JSNES.mapperName[64] = "Tengen RAMBO-1 chip", JSNES.mapperName[65] = "Irem H-3001 chip", JSNES.mapperName[66] = "GNROM switch", JSNES.mapperName[67] = "SunSoft3 chip", JSNES.mapperName[68] = "SunSoft4 chip", JSNES.mapperName[69] = "SunSoft5 FME-7 chip", JSNES.mapperName[71] = "Camerica chip", JSNES.mapperName[78] = "Irem 74HC161/32-based", JSNES.mapperName[91] = "Pirate HK-SF3 chip"
					};
				r.prototype = {
					VERTICAL_MIRRORING: 0,
					HORIZONTAL_MIRRORING: 1,
					FOURSCREEN_MIRRORING: 2,
					SINGLESCREEN_MIRRORING: 3,
					SINGLESCREEN_MIRRORING2: 4,
					SINGLESCREEN_MIRRORING3: 5,
					SINGLESCREEN_MIRRORING4: 6,
					CHRROM_MIRRORING: 7,
					header: null,
					rom: null,
					vrom: null,
					vromTile: null,
					romCount: null,
					vromCount: null,
					mirroring: null,
					batteryRam: null,
					trainer: null,
					fourScreen: null,
					mapperType: null,
					valid: !1,
					load: function (t) {
						var s, i, e;
						if (-1 === t.indexOf("NES")) throw new Error("Not a valid NES ROM.");
						for (JSNES.header = new Array(16), s = 0; s < 16; s++) JSNES.header[s] = 255 & t.charCodeAt(s);
						JSNES.romCount = JSNES.header[4], JSNES.vromCount = 2 * JSNES.header[5], JSNES.mirroring = 0 != (1 & JSNES.header[6]) ? 1 : 0, JSNES.batteryRam = 0 != (2 & JSNES.header[6]), JSNES.trainer = 0 != (4 & JSNES.header[6]), JSNES.fourScreen = 0 != (8 & JSNES.header[6]), JSNES.mapperType = JSNES.header[6] >> 4 | 240 & JSNES.header[7];
						var r = !1;
						for (s = 8; s < 16; s++)
							if (0 !== JSNES.header[s]) {
								r = !0;
								break
							}
						r && (JSNES.mapperType &= 15), JSNES.rom = new Array(JSNES.romCount);
						var n, a, o = 16;
						for (s = 0; s < JSNES.romCount; s++) {
							for (JSNES.rom[s] = new Array(16384), i = 0; i < 16384 && !(o + i >= t.length); i++) JSNES.rom[s][i] = 255 & t.charCodeAt(o + i);
							o += 16384
						}
						for (JSNES.vrom = new Array(JSNES.vromCount), s = 0; s < JSNES.vromCount; s++) {
							for (JSNES.vrom[s] = new Array(4096), i = 0; i < 4096 && !(o + i >= t.length); i++) JSNES.vrom[s][i] = 255 & t.charCodeAt(o + i);
							o += 4096
						}
						for (JSNES.vromTile = new Array(JSNES.vromCount), s = 0; s < JSNES.vromCount; s++)
							for (JSNES.vromTile[s] = new Array(256), i = 0; i < 256; i++) JSNES.vromTile[s][i] = new h;
						for (e = 0; e < JSNES.vromCount; e++)
							for (s = 0; s < 4096; s++) n = s >> 4, (a = s % 16) < 8 ? JSNES.vromTile[e][n].setScanline(a, JSNES.vrom[e][s], JSNES.vrom[e][s + 8]) : JSNES.vromTile[e][n].setScanline(a - 8, JSNES.vrom[e][s - 8], JSNES.vrom[e][s]);
						JSNES.valid = !0
					},
					getMirroringType: function () {
						return JSNES.fourScreen ? JSNES.FOURSCREEN_MIRRORING : 0 === JSNES.mirroring ? JSNES.HORIZONTAL_MIRRORING : JSNES.VERTICAL_MIRRORING
					},
					getMapperName: function () {
						return JSNES.mapperType >= 0 && JSNES.mapperType < JSNES.mapperName.length ? JSNES.mapperName[JSNES.mapperType] : "Unknown Mapper, " + JSNES.mapperType
					},
					mapperSupported: function () {
						return void 0 !== e[JSNES.mapperType]
					},
					createMapper: function () {
						if (JSNES.mapperSupported()) return new e[JSNES.mapperType](JSNES.nes);
						throw new Error("This ROM uses a mapper not supported by JSNES: " + JSNES.getMapperName() + "(" + JSNES.mapperType + ")")
					}
				}, s.exports = r
			}, {
				"./mappers": 4,
				"./tile": 9
			}
		],
		9: [
			function (t, s, i) {
				var e = function () {
					JSNES.pix = new Array(64), JSNES.fbIndex = null, JSNES.tIndex = null, JSNES.x = null, JSNES.y = null, JSNES.w = null, JSNES.h = null, JSNES.incX = null, JSNES.incY = null, JSNES.palIndex = null, JSNES.tpri = null, JSNES.c = null, JSNES.initialized = !1, JSNES.opaque = new Array(8)
				};
				e.prototype = {
					setBuffer: function (t) {
						for (JSNES.y = 0; JSNES.y < 8; JSNES.y++) JSNES.setScanline(JSNES.y, t[JSNES.y], t[JSNES.y + 8])
					},
					setScanline: function (t, s, i) {
						for (JSNES.initialized = !0, JSNES.tIndex = t << 3, JSNES.x = 0; JSNES.x < 8; JSNES.x++) JSNES.pix[JSNES.tIndex + JSNES.x] = (s >> 7 - JSNES.x & 1) + ((i >> 7 - JSNES.x & 1) << 1), 0 === JSNES.pix[JSNES.tIndex + JSNES.x] && (JSNES.opaque[t] = !1)
					},
					render: function (t, s, i, e, h, r, n, a, o, l, p, u, m) {
						if (!(r < -7 || r >= 256 || n < -7 || n >= 240))
							if (JSNES.w = e - s, JSNES.h = h - i, r < 0 && (s -= r), r + e >= 256 && (e = 256 - r), n < 0 && (i -= n), n + h >= 240 && (h = 240 - n), l || p)
								if (l && !p)
									for (JSNES.fbIndex = (n << 8) + r, JSNES.tIndex = 7, JSNES.y = 0; JSNES.y < 8; JSNES.y++) {
										for (JSNES.x = 0; JSNES.x < 8; JSNES.x++) JSNES.x >= s && JSNES.x < e && JSNES.y >= i && JSNES.y < h && (JSNES.palIndex = JSNES.pix[JSNES.tIndex], JSNES.tpri = m[JSNES.fbIndex], 0 !== JSNES.palIndex && u <= (255 & JSNES.tpri) && (t[JSNES.fbIndex] = o[JSNES.palIndex + a], JSNES.tpri = 3840 & JSNES.tpri | u, m[JSNES.fbIndex] = JSNES.tpri)), JSNES.fbIndex++, JSNES.tIndex--;
										JSNES.fbIndex -= 8, JSNES.fbIndex += 256, JSNES.tIndex += 16
									} else if (p && !l)
										for (JSNES.fbIndex = (n << 8) + r, JSNES.tIndex = 56, JSNES.y = 0; JSNES.y < 8; JSNES.y++) {
											for (JSNES.x = 0; JSNES.x < 8; JSNES.x++) JSNES.x >= s && JSNES.x < e && JSNES.y >= i && JSNES.y < h && (JSNES.palIndex = JSNES.pix[JSNES.tIndex], JSNES.tpri = m[JSNES.fbIndex], 0 !== JSNES.palIndex && u <= (255 & JSNES.tpri) && (t[JSNES.fbIndex] = o[JSNES.palIndex + a], JSNES.tpri = 3840 & JSNES.tpri | u, m[JSNES.fbIndex] = JSNES.tpri)), JSNES.fbIndex++, JSNES.tIndex++;
											JSNES.fbIndex -= 8, JSNES.fbIndex += 256, JSNES.tIndex -= 16
										} else
											for (JSNES.fbIndex = (n << 8) + r, JSNES.tIndex = 63, JSNES.y = 0; JSNES.y < 8; JSNES.y++) {
												for (JSNES.x = 0; JSNES.x < 8; JSNES.x++) JSNES.x >= s && JSNES.x < e && JSNES.y >= i && JSNES.y < h && (JSNES.palIndex = JSNES.pix[JSNES.tIndex], JSNES.tpri = m[JSNES.fbIndex], 0 !== JSNES.palIndex && u <= (255 & JSNES.tpri) && (t[JSNES.fbIndex] = o[JSNES.palIndex + a], JSNES.tpri = 3840 & JSNES.tpri | u, m[JSNES.fbIndex] = JSNES.tpri)), JSNES.fbIndex++, JSNES.tIndex--;
												JSNES.fbIndex -= 8, JSNES.fbIndex += 256
											} else
												for (JSNES.fbIndex = (n << 8) + r, JSNES.tIndex = 0, JSNES.y = 0; JSNES.y < 8; JSNES.y++) {
													for (JSNES.x = 0; JSNES.x < 8; JSNES.x++) JSNES.x >= s && JSNES.x < e && JSNES.y >= i && JSNES.y < h && (JSNES.palIndex = JSNES.pix[JSNES.tIndex], JSNES.tpri = m[JSNES.fbIndex], 0 !== JSNES.palIndex && u <= (255 & JSNES.tpri) && (t[JSNES.fbIndex] = o[JSNES.palIndex + a], JSNES.tpri = 3840 & JSNES.tpri | u, m[JSNES.fbIndex] = JSNES.tpri)), JSNES.fbIndex++, JSNES.tIndex++;
													JSNES.fbIndex -= 8, JSNES.fbIndex += 256
												}
					},
					isTransparent: function (t, s) {
						return 0 === JSNES.pix[(s << 3) + t]
					},
					toJSON: function () {
						return {
							opaque: JSNES.opaque,
							pix: JSNES.pix
						}
					},
					fromJSON: function (t) {
						JSNES.opaque = t.opaque, JSNES.pix = t.pix
					}
				}, s.exports = e
			}, {}
		],
		10: [
			function (t, s, i) {
				s.exports = {
					copyArrayElements: function (t, s, i, e, h) {
						for (var r = 0; r < h; ++r) i[e + r] = t[s + r]
					},
					copyArray: function (t) {
						return t.slice(0)
					},
					fromJSON: function (t, s) {
						for (var i = 0; i < t.JSON_PROPERTIES.length; i++) t[t.JSON_PROPERTIES[i]] = s[t.JSON_PROPERTIES[i]]
					},
					toJSON: function (t) {
						for (var s = {}, i = 0; i < t.JSON_PROPERTIES.length; i++) s[t.JSON_PROPERTIES[i]] = t[t.JSON_PROPERTIES[i]];
						return s
					}
				}
			}, {}
		]
	}, {}, [3])(3)
}));