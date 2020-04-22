import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getDeepRef, getKeysFromPath } from 'vuex-easy-access';
import { isAnyObject, isPlainObject, isArray, isFunction, isNumber, isString, isDate } from 'is-what';
import copy from 'copy-anything';
import { merge } from 'merge-anything';
import flatten from 'flatten-anything';
import { compareObjectProps } from 'compare-anything';
import { findAndReplace, findAndReplaceIf } from 'find-and-replace-anything';
import filter from 'filter-anything';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var defaultConfig = {
    firestorePath: '',
    // The path to a collection or doc in firestore. You can use `{userId}` which will be replaced with the user Id.
    firestoreRefType: '',
    // `'collection'` or `'doc'`. Depending on your `firestorePath`.
    moduleName: '',
    // The module name. Can be nested, eg. `'user/items'`
    statePropName: null,
    // The name of the property where the docs or doc will be synced to. If left blank it will be synced on the state of the module.
    logging: false,
    // Related to the 2-way sync:
    sync: {
        where: [],
        orderBy: [],
        fillables: [],
        guard: [],
        defaultValues: {},
        preventInitialDocInsertion: false,
        debounceTimerMs: 1000,
        // HOOKS for local changes:
        insertHook: function (updateStore, doc, store) {
            return updateStore(doc);
        },
        patchHook: function (updateStore, doc, store) {
            return updateStore(doc);
        },
        deleteHook: function (updateStore, id, store) {
            return updateStore(id);
        },
        // HOOKS after local changes before sync:
        insertHookBeforeSync: function (updateFirestore, doc, store) {
            return updateFirestore(doc);
        },
        patchHookBeforeSync: function (updateFirestore, doc, store) {
            return updateFirestore(doc);
        },
        deleteHookBeforeSync: function (updateFirestore, id, store) {
            return updateFirestore(id);
        },
        // HOOKS for local batch changes:
        insertBatchHook: function (updateStore, docs, store) {
            return updateStore(docs);
        },
        patchBatchHook: function (updateStore, doc, ids, store) {
            return updateStore(doc, ids);
        },
        deleteBatchHook: function (updateStore, ids, store) {
            return updateStore(ids);
        },
    },
    // When items on the server side are changed:
    serverChange: {
        defaultValues: {},
        convertTimestamps: {},
        // HOOKS for changes on SERVER:
        addedHook: function (updateStore, doc, id, store) {
            return updateStore(doc);
        },
        modifiedHook: function (updateStore, doc, id, store) {
            return updateStore(doc);
        },
        removedHook: function (updateStore, doc, id, store) {
            return updateStore(doc);
        },
    },
    // When items are fetched through `dispatch('module/fetch', {clauses})`.
    fetch: {
        // The max amount of documents to be fetched. Defaults to 50.
        docLimit: 50,
    },
};

/**
 * a function returning the state object with ONLY the ._sync prop
 *
 * @export
 * @returns {IState} the state object
 */
function pluginState () {
    return {
        _sync: {
            signedIn: false,
            userId: null,
            streaming: {},
            unsubscribe: {},
            pathVariables: {},
            patching: false,
            syncStack: {
                inserts: [],
                updates: {},
                propDeletions: {},
                deletions: [],
                debounceTimer: null,
                resolves: [],
                rejects: [],
            },
            fetched: {},
            stopPatchingTimeout: null
        }
    };
}

var errorMessages = {
    'user-auth': "\n    Error trying to set userId.\n    Please double check if you have correctly authenticated the user with Firebase Auth before calling `openDBChannel` or `fetchAndAdd`.\n\n    If you still get this error, try passing your firebase instance to the plugin as described in the documentation:\n    https://mesqueeb.github.io/vuex-easy-firestore/extra-features.html#pass-firebase-dependency\n  ",
    'delete-missing-id': "\n    Missing id of the doc you want to delete!\n    Correct usage:\n      dispatch('delete', id)\n  ",
    'delete-missing-path': "\n    Missing path to the prop you want to delete!\n    Correct usage:\n      dispatch('delete', 'path.to.prop')\n\n    Use `.` for sub props!\n  ",
    'missing-id': "\n    This action requires an id to be passed!\n  ",
    'patch-missing-id': "\n    Missing an id of the doc you want to patch!\n    Correct usage:\n\n    // pass `id` as a prop:\n    dispatch('module/set', {id: '123', name: 'best item name'})\n    // or\n    dispatch('module/patch', {id: '123', name: 'best item name'})\n  ",
    'missing-path-variables': "\n    A path variable was passed without defining it!\n    In VuexEasyFirestore you can create paths with variables:\n    eg: `groups/{groupId}/user/{userId}`\n\n    `userId` is automatically replaced with the userId of the firebase user.\n    `groupId` or any other variable that needs to be set after authentication needs to be passed upon the `openDBChannel` action.\n\n    // (in module config) Example path:\n    firestorePath: 'groups/{groupId}/user/{userId}'\n\n    // Then before openDBChannel:\n    // retrieve the value\n    const groupId = someIdRetrievedAfterSignin\n    // pass as argument into openDBChannel:\n    dispatch('moduleName/openDBChannel', {groupId})\n  ",
    'patch-no-ref': "\n    Something went wrong during the PATCH mutation:\n    The document it's trying to patch does not exist.\n  ",
    'only-in-collection-mode': "\n    The action you dispatched can only be used in 'collection' mode.\n  ",
    'initial-doc-failed': "\n    Initial doc insertion failed. Further `set` or `patch` actions will also fail. Requires an internet connection when the initial doc is inserted. Check the error returned by Firebase:\n  ",
    'sync-error': "\n    Something went wrong while trying to synchronise data to Cloud Firestore.\n    The data is kept in queue, so that it will try to sync again upon the next 'set' or 'patch' action.\n  ",
};
/**
 * execute Error() based on an error id string
 *
 * @export
 * @param {string} errorId the error id
 * @param {any} [error] an actual error from an async request or something
 * @returns {string} the error id
 */
function error (errorId, error) {
    var logData = errorMessages[errorId] || errorId;
    console.error("[vuex-easy-firestore] Error! " + logData);
    if (error)
        console.error(error);
    return errorId;
}

var Firebase = firebase;
function setFirebaseDependency(firebaseDependency) {
    Firebase = firebaseDependency;
}
var ArrayUnion = /** @class */ (function () {
    function ArrayUnion() {
        var payload = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            payload[_i] = arguments[_i];
        }
        this.isArrayHelper = true;
        this.payload = payload;
    }
    ArrayUnion.prototype.executeOn = function (array) {
        this.payload.forEach(function (item) {
            // if array of object, find it by "id" (ex.: works with doc reference)
            var index = isAnyObject(item) && item.id !== undefined
                ? array.findIndex(function (_item) { return _item.id === item.id; })
                : array.indexOf(item);
            if (index === -1) {
                array.push(item);
            }
        });
        return array;
    };
    ArrayUnion.prototype.getFirestoreFieldValue = function () {
        var _a;
        return (_a = Firebase.firestore.FieldValue).arrayUnion.apply(_a, this.payload);
    };
    return ArrayUnion;
}());
var ArrayRemove = /** @class */ (function () {
    function ArrayRemove() {
        var payload = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            payload[_i] = arguments[_i];
        }
        this.isArrayHelper = true;
        this.payload = payload;
    }
    ArrayRemove.prototype.executeOn = function (array) {
        this.payload.forEach(function (item) {
            // if array of object, remove it by "id" (ex.: works with doc reference)
            var index = isAnyObject(item) && item.id !== undefined
                ? array.findIndex(function (_item) { return _item.id === item.id; })
                : array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
        });
        return array;
    };
    ArrayRemove.prototype.getFirestoreFieldValue = function () {
        var _a;
        return (_a = Firebase.firestore.FieldValue).arrayRemove.apply(_a, this.payload);
    };
    return ArrayRemove;
}());
function arrayUnion() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    return new (ArrayUnion.bind.apply(ArrayUnion, __spreadArrays([void 0], payload)))();
}
function arrayRemove() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    return new (ArrayRemove.bind.apply(ArrayRemove, __spreadArrays([void 0], payload)))();
}
function isArrayHelper(value) {
    // this is bugged in vuex actions, I DONT KNOW WHY
    // return (
    //   value instanceof ArrayUnion ||
    //   value instanceof ArrayRemove
    // )
    return (isAnyObject(value) &&
        !isPlainObject(value) &&
        // @ts-ignore
        value.isArrayHelper === true);
}

var Firebase$1 = firebase;
function setFirebaseDependency$1(firebaseDependency) {
    Firebase$1 = firebaseDependency;
}
var Increment = /** @class */ (function () {
    function Increment(payload) {
        this.isIncrementHelper = true;
        this.payload = payload;
    }
    Increment.prototype.executeOn = function (counter) {
        return counter + this.payload;
    };
    Increment.prototype.getFirestoreFieldValue = function () {
        return Firebase$1.firestore.FieldValue.increment(this.payload);
    };
    return Increment;
}());
function increment(payload) {
    return new Increment(payload);
}
function isIncrementHelper(payload) {
    // return payload instanceof Increment
    return (isAnyObject(payload) &&
        !isPlainObject(payload) &&
        // @ts-ignore
        payload.isIncrementHelper === true);
}

/**
 * a function returning the mutations object
 *
 * @export
 * @param {object} userState
 * @returns {AnyObject} the mutations object
 */
function pluginMutations (userState) {
    return {
        SET_PATHVARS: function (state, pathVars) {
            var self = this;
            Object.keys(pathVars).forEach(function (key) {
                var pathPiece = pathVars[key];
                self._vm.$set(state._sync.pathVariables, key, pathPiece);
            });
        },
        SET_SYNCCLAUSES: function (state, _a) {
            var where = _a.where, orderBy = _a.orderBy;
            if (where && isArray(where))
                state._conf.sync.where = where;
            if (orderBy && isArray(orderBy))
                state._conf.sync.orderBy = orderBy;
        },
        SET_USER_ID: function (state, userId) {
            if (!userId) {
                state._sync.signedIn = false;
                state._sync.userId = null;
            }
            else {
                state._sync.signedIn = true;
                state._sync.userId = userId;
            }
        },
        CLEAR_USER: function (state) {
            state._sync.signedIn = false;
            state._sync.userId = null;
        },
        RESET_VUEX_EASY_FIRESTORE_STATE: function (state) {
            // unsubscribe all DBChannel listeners:
            Object.keys(state._sync.unsubscribe).forEach(function (unsubscribe) {
                if (isFunction(unsubscribe))
                    unsubscribe();
            });
            var self = this;
            var _sync = pluginState()._sync;
            var newState = merge(copy(userState), { _sync: _sync });
            var statePropName = state._conf.statePropName;
            var docContainer = statePropName ? state[statePropName] : state;
            Object.keys(newState).forEach(function (key) {
                self._vm.$set(state, key, newState[key]);
            });
            Object.keys(docContainer).forEach(function (key) {
                if (Object.keys(newState).includes(key))
                    return;
                self._vm.$delete(docContainer, key);
            });
        },
        resetSyncStack: function (state) {
            var _sync = pluginState()._sync;
            var syncStack = _sync.syncStack;
            state._sync.syncStack = syncStack;
        },
        INSERT_DOC: function (state, doc) {
            if (state._conf.firestoreRefType.toLowerCase() !== 'collection')
                return;
            if (state._conf.statePropName) {
                this._vm.$set(state[state._conf.statePropName], doc.id, doc);
            }
            else {
                this._vm.$set(state, doc.id, doc);
            }
        },
        PATCH_DOC: function (state, patches) {
            var _this = this;
            // Get the state prop ref
            var ref = state._conf.statePropName ? state[state._conf.statePropName] : state;
            if (state._conf.firestoreRefType.toLowerCase() === 'collection') {
                ref = ref[patches.id];
            }
            if (!ref)
                return error('patch-no-ref');
            return Object.keys(patches).forEach(function (key) {
                var newVal = patches[key];
                // Merge if exists
                function helpers(originVal, newVal) {
                    if (isArray(originVal) && isArrayHelper(newVal)) {
                        newVal = newVal.executeOn(originVal);
                    }
                    if (isNumber(originVal) && isIncrementHelper(newVal)) {
                        newVal = newVal.executeOn(originVal);
                    }
                    return newVal; // always return newVal as fallback!!
                }
                newVal = merge({ extensions: [helpers] }, ref[key], patches[key]);
                _this._vm.$set(ref, key, newVal);
            });
        },
        DELETE_DOC: function (state, id) {
            if (state._conf.firestoreRefType.toLowerCase() !== 'collection')
                return;
            if (state._conf.statePropName) {
                this._vm.$delete(state[state._conf.statePropName], id);
            }
            else {
                this._vm.$delete(state, id);
            }
        },
        DELETE_PROP: function (state, path) {
            var searchTarget = state._conf.statePropName ? state[state._conf.statePropName] : state;
            var propArr = path.split('.');
            var target = propArr.pop();
            if (!propArr.length) {
                return this._vm.$delete(searchTarget, target);
            }
            var ref = getDeepRef(searchTarget, propArr.join('.'));
            return this._vm.$delete(ref, target);
        },
    };
}

/**
 * convert to new Date() if defaultValue == '%convertTimestamp%'
 *
 * @param {*} originVal
 * @param {*} targetVal
 * @returns {Date}
 */
function convertTimestamps(originVal, targetVal) {
    if (originVal === '%convertTimestamp%') {
        // firestore timestamps
        if (isAnyObject(targetVal) &&
            !isPlainObject(targetVal) &&
            // @ts-ignore
            isFunction(targetVal.toDate)) {
            // @ts-ignore
            return targetVal.toDate();
        }
        // strings
        if (isString(targetVal) && isDate(new Date(targetVal))) {
            return new Date(targetVal);
        }
    }
    return targetVal;
}
/**
 * Merge an object onto defaultValues
 *
 * @export
 * @param {object} obj
 * @param {object} defaultValues
 * @returns {AnyObject} the new object
 */
function setDefaultValues (obj, defaultValues) {
    if (!isPlainObject(defaultValues))
        console.error('[vuex-easy-firestore] Trying to merge target:', obj, 'onto a non-object (defaultValues):', defaultValues);
    if (!isPlainObject(obj))
        console.error('[vuex-easy-firestore] Trying to merge a non-object:', obj, 'onto the defaultValues:', defaultValues);
    var result = merge({ extensions: [convertTimestamps] }, defaultValues, obj);
    return findAndReplace(result, '%convertTimestamp%', null, {
        onlyPlainObjects: true,
    });
}

/**
 * Debounce helper
 *
 * let wait = startDebounce(1000)
 * wait.done.then(_ => handle())
 * wait.refresh() // to refresh
 *
 * @export
 * @param {number} ms
 * @returns {{done: any, refresh: () => {}}}
 * @author Adam Dorling
 * @contact https://codepen.io/naito
 */
function startDebounce (ms) {
    var startTime = Date.now();
    var done = new Promise(function (resolve, reject) {
        var interval = setInterval(function (_) {
            var now = Date.now();
            var deltaT = now - startTime;
            if (deltaT >= ms) {
                clearInterval(interval);
                resolve(true);
            }
        }, 10);
    });
    var refresh = function () { return (startTime = Date.now()); };
    return { done: done, refresh: refresh };
}

/**
 * Grab until the api limit (500), put the rest back in the syncStack. State will get modified!
 *
 * @param {string} syncStackProp the prop of _sync.syncStack[syncStackProp]
 * @param {number} count the current count
 * @param {number} maxCount the max count of the batch
 * @param {object} state the store's state, will get modified!
 * @returns {any[]} the targets for the batch. Add this array length to the count
 */
function grabUntilApiLimit(syncStackProp, count, maxCount, state) {
    var targets = state._sync.syncStack[syncStackProp];
    // Check if there are more than maxCount batch items already
    if (count >= maxCount) {
        // already at maxCount or more, leave items in syncstack, and don't add anything to batch
        targets = [];
    }
    else {
        // Convert to array if targets is an object (eg. updates)
        var targetIsObject = isPlainObject(targets);
        if (targetIsObject) {
            targets = Object.values(targets);
        }
        // Batch supports only until maxCount items
        var grabCount = maxCount - count;
        var targetsOK = targets.slice(0, grabCount);
        var targetsLeft = targets.slice(grabCount);
        // Put back the remaining items over maxCount
        if (targetIsObject) {
            targetsLeft = Object.values(targetsLeft)
                .reduce(function (carry, update) {
                var id = update.id;
                carry[id] = update;
                return carry;
            }, {});
        }
        state._sync.syncStack[syncStackProp] = targetsLeft;
        // Define the items we'll add below
        targets = targetsOK;
    }
    return targets;
}
/**
 * Create a Firebase batch from a syncStack to be passed inside the state param.
 *
 * @export
 * @param {IPluginState} state The state will get modified!
 * @param {AnyObject} getters The getters which should have `dbRef`, `storeRef`, `collectionMode` and `firestorePathComplete`
 * @param {any} firebaseBatch a firestore.batch() instance
 * @param {number} [batchMaxCount=500] The max count of the batch. Defaults to 500 as per Firestore documentation.
 * @returns {*} A Firebase firestore batch object.
 */
function makeBatchFromSyncstack(state, getters, firebaseBatch, batchMaxCount) {
    if (batchMaxCount === void 0) { batchMaxCount = 500; }
    // get state & getter variables
    var _a = state._conf, firestorePath = _a.firestorePath, logging = _a.logging;
    var guard = state._conf.sync.guard;
    var firestorePathComplete = getters.firestorePathComplete, dbRef = getters.dbRef, collectionMode = getters.collectionMode;
    var batch = firebaseBatch;
    // make batch
    var log = {};
    var count = 0;
    // Add 'updates' to batch
    var updates = grabUntilApiLimit('updates', count, batchMaxCount, state);
    log['updates: '] = updates;
    count = count + updates.length;
    // Add to batch
    updates.forEach(function (item) {
        var id = item.id;
        var docRef = (collectionMode) ? dbRef.doc(id) : dbRef;
        // replace arrayUnion and arrayRemove
        var patchData = Object.entries(item)
            .reduce(function (carry, _a) {
            var key = _a[0], data = _a[1];
            // replace arrayUnion and arrayRemove
            carry[key] = findAndReplaceIf(data, function (foundVal) {
                if (isArrayHelper(foundVal)) {
                    return foundVal.getFirestoreFieldValue();
                }
                if (isIncrementHelper(foundVal)) {
                    return foundVal.getFirestoreFieldValue();
                }
                return foundVal;
            });
            return carry;
        }, {});
        // delete id if it's guarded
        if (guard.includes('id'))
            delete item.id;
        // @ts-ignore
        batch.update(docRef, patchData);
    });
    // Add 'propDeletions' to batch
    var propDeletions = grabUntilApiLimit('propDeletions', count, batchMaxCount, state);
    log['prop deletions: '] = propDeletions;
    count = count + propDeletions.length;
    // Add to batch
    propDeletions.forEach(function (item) {
        var id = item.id;
        var docRef = (collectionMode) ? dbRef.doc(id) : dbRef;
        // delete id if it's guarded
        if (guard.includes('id'))
            delete item.id;
        // @ts-ignore
        batch.update(docRef, item);
    });
    // Add 'deletions' to batch
    var deletions = grabUntilApiLimit('deletions', count, batchMaxCount, state);
    log['deletions: '] = deletions;
    count = count + deletions.length;
    // Add to batch
    deletions.forEach(function (id) {
        var docRef = dbRef.doc(id);
        batch.delete(docRef);
    });
    // Add 'inserts' to batch
    var inserts = grabUntilApiLimit('inserts', count, batchMaxCount, state);
    log['inserts: '] = inserts;
    count = count + inserts.length;
    // Add to batch
    inserts.forEach(function (item) {
        var newRef = dbRef.doc(item.id);
        batch.set(newRef, item);
    });
    // log the batch contents
    if (logging) {
        console.group('[vuex-easy-firestore] api call batch:');
        console.log("%cFirestore PATH: " + firestorePathComplete + " [" + firestorePath + "]", 'color: grey');
        Object.keys(log).forEach(function (key) {
            console.log(key, log[key]);
        });
        console.groupEnd();
    }
    return batch;
}
/**
 * Get the matches of path variables: eg. return ['groupId'] if pathPiece is '{groupId}'
 *
 * @export
 * @param {string} pathPiece eg. 'groups' or '{groupId}'
 * @returns {string[]} returns ['groupId'] in case of '{groupId}'
 */
function getPathVarMatches(pathPiece) {
    var matches = pathPiece.match(/\{([a-z]+)\}/gi);
    if (!matches)
        return [];
    return matches.map(function (key) { return trimAccolades(key); });
}
/**
 * Get the variable name of a piece of path: eg. return 'groupId' if pathPiece is '{groupId}'
 *
 * @export
 * @param {string} pathPiece eg. '{groupId}'
 * @returns {string} returns 'groupId' in case of '{groupId}'
 */
function trimAccolades(pathPiece) {
    return pathPiece.slice(1, -1);
}
function stringifyParams(params) {
    return params.map(function (param) {
        if (isAnyObject(param) && !isPlainObject(param)) {
            // @ts-ignore
            return String(param.constructor.name) + String(param.id);
        }
        return String(param);
    }).join();
}
/**
 * Gets an object with {where, orderBy} clauses and returns a unique identifier for that
 *
 * @export
 * @param {AnyObject} [whereOrderBy={}] whereOrderBy {where, orderBy, pathVariables}
 * @returns {string}
 */
function createFetchIdentifier(whereOrderBy) {
    if (whereOrderBy === void 0) { whereOrderBy = {}; }
    var identifier = '';
    if ('where' in whereOrderBy) {
        identifier += '[where]' + whereOrderBy.where.map(function (where) { return stringifyParams(where); }).join();
    }
    if ('orderBy' in whereOrderBy) {
        identifier += '[orderBy]' + stringifyParams(whereOrderBy.orderBy);
    }
    if ('pathVariables' in whereOrderBy) {
        delete whereOrderBy.pathVariables.where;
        delete whereOrderBy.pathVariables.orderBy;
        identifier += '[pathVariables]' + JSON.stringify(whereOrderBy.pathVariables);
    }
    return identifier;
}

/**
 * gets an ID from a single piece of payload.
 *
 * @export
 * @param {(object | string)} payloadPiece
 * @param {object} [conf] (optional - for error handling) the vuex-easy-access config
 * @param {string} [path] (optional - for error handling) the path called
 * @param {(object | any[] | string)} [fullPayload] (optional - for error handling) the full payload on which each was `getId()` called
 * @returns {string} the id
 */
function getId(payloadPiece, conf, path, fullPayload) {
    if (isString(payloadPiece))
        return payloadPiece;
    if (isPlainObject(payloadPiece)) {
        if ('id' in payloadPiece)
            return payloadPiece.id;
        var keys = Object.keys(payloadPiece);
        if (keys.length === 1)
            return keys[0];
    }
    return '';
}
/**
 * Returns a value of a payload piece. Eg. {[id]: 'val'} will return 'val'
 *
 * @param {*} payloadPiece
 * @returns {*} the value
 */
function getValueFromPayloadPiece(payloadPiece) {
    if (isPlainObject(payloadPiece) &&
        !payloadPiece.id &&
        Object.keys(payloadPiece).length === 1 &&
        isPlainObject(payloadPiece[Object.keys(payloadPiece)[0]])) {
        return Object.values(payloadPiece)[0];
    }
    return payloadPiece;
}

/**
 * A function returning the actions object
 *
 * @export
 * @param {*} Firebase The Firebase dependency
 * @returns {AnyObject} the actions object
 */
function pluginActions (Firebase) {
    var _this = this;
    return {
        setUserId: function (_a, userId) {
            var commit = _a.commit, getters = _a.getters;
            if (userId === undefined)
                userId = null;
            // undefined cannot be synced to firestore
            if (!userId && Firebase.auth().currentUser) {
                userId = Firebase.auth().currentUser.uid;
            }
            commit('SET_USER_ID', userId);
            if (getters.firestorePathComplete.includes('{userId}'))
                return error('user-auth');
        },
        clearUser: function (_a) {
            var commit = _a.commit;
            commit('CLEAR_USER');
        },
        setPathVars: function (_a, pathVars) {
            var commit = _a.commit;
            commit('SET_PATHVARS', pathVars);
        },
        duplicate: function (_a, id) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            return __awaiter(_this, void 0, void 0, function () {
                var doc, dId, idMap;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!getters.collectionMode)
                                return [2 /*return*/, error('only-in-collection-mode')];
                            if (!id)
                                return [2 /*return*/, {}];
                            doc = merge(getters.storeRef[id], { id: null });
                            return [4 /*yield*/, dispatch('insert', doc)];
                        case 1:
                            dId = _c.sent();
                            idMap = (_b = {}, _b[id] = dId, _b);
                            return [2 /*return*/, idMap];
                    }
                });
            });
        },
        duplicateBatch: function (_a, ids) {
            var _this = this;
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            if (ids === void 0) { ids = []; }
            if (!getters.collectionMode)
                return error('only-in-collection-mode');
            if (!isArray(ids) || !ids.length)
                return {};
            var idsMap = ids.reduce(function (carry, id) { return __awaiter(_this, void 0, void 0, function () {
                var idMap;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dispatch('duplicate', id)];
                        case 1:
                            idMap = _a.sent();
                            return [4 /*yield*/, carry];
                        case 2:
                            carry = _a.sent();
                            return [2 /*return*/, Object.assign(carry, idMap)];
                    }
                });
            }); }, {});
            return idsMap;
        },
        patchDoc: function (_a, _b) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var _c = _b === void 0 ? {
                ids: [],
                doc: {},
            } : _b, _d = _c.id, id = _d === void 0 ? '' : _d, _e = _c.ids, ids = _e === void 0 ? [] : _e, doc = _c.doc;
            // 0. payload correction (only arrays)
            if (!isArray(ids))
                return error("`ids` prop passed to 'patch' needs to be an array");
            if (id)
                ids.push(id);
            // EXTRA: check if doc is being inserted if so
            state._sync.syncStack.inserts.forEach(function (newDoc, newDocIndex) {
                // get the index of the id that is also in the insert stack
                var indexIdInInsert = ids.indexOf(newDoc.id);
                if (indexIdInInsert === -1)
                    return;
                // the doc trying to be synced is also in insert
                // prepare the doc as new doc:
                var patchDoc = getters.prepareForInsert([doc])[0];
                // replace insert sync stack with merged item:
                state._sync.syncStack.inserts[newDocIndex] = merge(newDoc, patchDoc);
                // empty out the id that was to be patched:
                ids.splice(indexIdInInsert, 1);
            });
            // 1. Prepare for patching
            var syncStackItems = getters.prepareForPatch(ids, doc);
            // 2. Push to syncStack
            Object.entries(syncStackItems).forEach(function (_a) {
                var id = _a[0], patchData = _a[1];
                var newVal;
                if (!state._sync.syncStack.updates[id]) {
                    newVal = patchData;
                }
                else {
                    newVal = merge(
                    // extension to update increment and array helpers
                    {
                        extensions: [
                            function (originVal, newVal) {
                                if (isArrayHelper(originVal)) {
                                    originVal.payload = originVal.payload.concat(newVal.payload);
                                    newVal = originVal;
                                }
                                if (isIncrementHelper(originVal)) {
                                    originVal.payload = originVal.payload + newVal.payload;
                                    newVal = originVal;
                                }
                                return newVal; // always return newVal as fallback!!
                            },
                        ],
                    }, state._sync.syncStack.updates[id], patchData);
                }
                state._sync.syncStack.updates[id] = newVal;
            });
            // 3. Create or refresh debounce & pass id to resolve
            return dispatch('handleSyncStackDebounce', id || ids);
        },
        deleteDoc: function (_a, payload) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            if (payload === void 0) { payload = []; }
            // 0. payload correction (only arrays)
            var ids = !isArray(payload) ? [payload] : payload;
            // 1. Prepare for patching
            // 2. Push to syncStack
            var deletions = state._sync.syncStack.deletions.concat(ids);
            state._sync.syncStack.deletions = deletions;
            if (!state._sync.syncStack.deletions.length)
                return;
            // 3. Create or refresh debounce & pass id to resolve
            return dispatch('handleSyncStackDebounce', payload);
        },
        deleteProp: function (_a, path) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            // 1. Prepare for patching
            var syncStackItem = getters.prepareForPropDeletion(path);
            // 2. Push to syncStack
            Object.keys(syncStackItem).forEach(function (id) {
                var newVal = !state._sync.syncStack.propDeletions[id]
                    ? syncStackItem[id]
                    : merge(state._sync.syncStack.propDeletions[id], syncStackItem[id]);
                state._sync.syncStack.propDeletions[id] = newVal;
            });
            // 3. Create or refresh debounce & pass id to resolve
            return dispatch('handleSyncStackDebounce', path);
        },
        insertDoc: function (_a, payload) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            if (payload === void 0) { payload = []; }
            // 0. payload correction (only arrays)
            var docs = !isArray(payload) ? [payload] : payload;
            // 1. Prepare for patching
            var syncStack = getters.prepareForInsert(docs);
            // 2. Push to syncStack
            var inserts = state._sync.syncStack.inserts.concat(syncStack);
            state._sync.syncStack.inserts = inserts;
            // 3. Create or refresh debounce & pass id to resolve
            var payloadToResolve = isArray(payload) ? payload.map(function (doc) { return doc.id; }) : payload.id;
            return dispatch('handleSyncStackDebounce', payloadToResolve);
        },
        insertInitialDoc: function (_a) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            // 0. only docMode
            if (getters.collectionMode)
                return;
            // 1. Prepare for insert
            var initialDoc = getters.storeRef ? getters.storeRef : {};
            var initialDocPrepared = getters.prepareInitialDocForInsert(initialDoc);
            // 2. Create a reference to the SF doc.
            return new Promise(function (resolve, reject) {
                getters.dbRef
                    .set(initialDocPrepared)
                    .then(function () {
                    if (state._conf.logging) {
                        var message = 'Initial doc succesfully inserted';
                        console.log("%c [vuex-easy-firestore] " + message + "; for Firestore PATH: " + getters.firestorePathComplete + " [" + state._conf.firestorePath + "]", 'color: SeaGreen');
                    }
                    resolve();
                })
                    .catch(function (error$1) {
                    error('initial-doc-failed', error$1);
                    reject(error$1);
                });
            });
        },
        handleSyncStackDebounce: function (_a, payloadToResolve) {
            var state = _a.state, commit = _a.commit, dispatch = _a.dispatch, getters = _a.getters;
            return new Promise(function (resolve, reject) {
                state._sync.syncStack.resolves.push(function () { return resolve(payloadToResolve); });
                state._sync.syncStack.rejects.push(reject);
                if (!getters.signedIn)
                    return false;
                if (!state._sync.syncStack.debounceTimer) {
                    var ms = state._conf.sync.debounceTimerMs;
                    var debounceTimer = startDebounce(ms);
                    state._sync.syncStack.debounceTimer = debounceTimer;
                    debounceTimer.done.then(function () {
                        dispatch('batchSync')
                            .then(function () { return dispatch('resolveSyncStack'); })
                            .catch(function (e) { return dispatch('rejectSyncStack', e); });
                    });
                }
                state._sync.syncStack.debounceTimer.refresh();
            });
        },
        resolveSyncStack: function (_a) {
            var state = _a.state;
            state._sync.syncStack.rejects = [];
            state._sync.syncStack.resolves.forEach(function (r) { return r(); });
        },
        rejectSyncStack: function (_a, error) {
            var state = _a.state;
            state._sync.syncStack.resolves = [];
            state._sync.syncStack.rejects.forEach(function (r) { return r(error); });
        },
        batchSync: function (_a) {
            var getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch, state = _a.state;
            var batch = makeBatchFromSyncstack(state, getters, Firebase.firestore().batch());
            dispatch('_startPatching');
            state._sync.syncStack.debounceTimer = null;
            return new Promise(function (resolve, reject) {
                batch
                    .commit()
                    .then(function (_) {
                    var remainingSyncStack = Object.keys(state._sync.syncStack.updates).length +
                        state._sync.syncStack.deletions.length +
                        state._sync.syncStack.inserts.length +
                        state._sync.syncStack.propDeletions.length;
                    if (remainingSyncStack) {
                        dispatch('batchSync');
                    }
                    dispatch('_stopPatching');
                    return resolve();
                })
                    .catch(function (error$1) {
                    state._sync.patching = 'error';
                    state._sync.syncStack.debounceTimer = null;
                    error('sync-error', error$1);
                    return reject(error$1);
                });
            });
        },
        fetch: function (_a, parameters) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            if (parameters === void 0) { parameters = { clauses: {}, pathVariables: {} }; }
            if (!isPlainObject(parameters))
                parameters = {};
            /* COMPATIBILITY START
             * this ensures backward compatibility for people who passed pathVariables and
             * clauses directly at the root of the `parameters` object. Can be removed in
             * a later version
             */
            if (!parameters.clauses && !parameters.pathVariables) {
                var pathVariables_1 = Object.assign({}, parameters);
                // @ts-ignore
                delete pathVariables_1.where;
                // @ts-ignore
                delete pathVariables_1.orderBy;
                Object.entries(pathVariables_1).forEach(function (entry) {
                    if (typeof entry[1] === 'object') {
                        delete pathVariables_1[entry[0]];
                    }
                });
                parameters = Object.assign({}, { clauses: parameters, pathVariables: pathVariables_1 });
            }
            var defaultParameters = {
                clauses: {},
                pathVariables: {},
                includeMetadataChanges: false,
            };
            parameters = Object.assign(defaultParameters, parameters);
            /* COMPATIBILITY END */
            if (!getters.collectionMode)
                return error('only-in-collection-mode');
            dispatch('setUserId');
            var _b = parameters.clauses, where = _b.where, whereFilters = _b.whereFilters, orderBy = _b.orderBy;
            if (!isArray(where))
                where = [];
            if (!isArray(orderBy))
                orderBy = [];
            if (isArray(whereFilters) && whereFilters.length)
                where = whereFilters; // deprecated
            commit('SET_PATHVARS', parameters.pathVariables);
            return new Promise(function (resolve, reject) {
                // log
                if (state._conf.logging) {
                    console.log("%c fetch for Firestore PATH: " + getters.firestorePathComplete + " [" + state._conf.firestorePath + "]", 'color: goldenrod');
                }
                if (!getters.signedIn)
                    return resolve();
                var identifier = createFetchIdentifier({
                    where: where,
                    orderBy: orderBy,
                    pathVariables: state._sync.pathVariables,
                });
                var fetched = state._sync.fetched[identifier];
                // We've never fetched this before:
                if (!fetched) {
                    var ref_1 = getters.dbRef;
                    // apply where clauses and orderBy
                    getters.getWhereArrays(where).forEach(function (paramsArr) {
                        ref_1 = ref_1.where.apply(ref_1, paramsArr);
                    });
                    if (orderBy.length)
                        ref_1 = ref_1.orderBy.apply(ref_1, orderBy);
                    state._sync.fetched[identifier] = {
                        ref: ref_1,
                        done: false,
                        retrievedFetchRefs: [],
                        nextFetchRef: null,
                    };
                }
                var fRequest = state._sync.fetched[identifier];
                // We're already done fetching everything:
                if (fRequest.done) {
                    if (state._conf.logging)
                        console.log('[vuex-easy-firestore] done fetching');
                    return resolve({ done: true });
                }
                // attach fetch clauses
                var fRef = state._sync.fetched[identifier].ref;
                if (fRequest.nextFetchRef) {
                    // get next ref if saved in state
                    fRef = state._sync.fetched[identifier].nextFetchRef;
                }
                // add doc limit
                var limit = isNumber(parameters.clauses.limit)
                    ? parameters.clauses.limit
                    : state._conf.fetch.docLimit;
                if (limit > 0)
                    fRef = fRef.limit(limit);
                // Stop if all records already fetched
                if (fRequest.retrievedFetchRefs.includes(fRef)) {
                    console.log('[vuex-easy-firestore] Already retrieved this part.');
                    return resolve();
                }
                // make fetch request
                fRef
                    .get()
                    .then(function (querySnapshot) {
                    var docs = querySnapshot.docs;
                    if (docs.length === 0) {
                        state._sync.fetched[identifier].done = true;
                        querySnapshot.done = true;
                        return resolve(querySnapshot);
                    }
                    if (docs.length < limit) {
                        state._sync.fetched[identifier].done = true;
                    }
                    state._sync.fetched[identifier].retrievedFetchRefs.push(fRef);
                    // Get the last visible document
                    resolve(querySnapshot);
                    var lastVisible = docs[docs.length - 1];
                    // set the reference for the next records.
                    var next = fRef.startAfter(lastVisible);
                    state._sync.fetched[identifier].nextFetchRef = next;
                })
                    .catch(function (error$1) {
                    return reject(error(error$1));
                });
            });
        },
        // where: [['archived', '==', true]]
        // orderBy: ['done_date', 'desc']
        fetchAndAdd: function (_a, parameters) {
            var _this = this;
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            if (parameters === void 0) { parameters = { clauses: {}, pathVariables: {} }; }
            if (!isPlainObject(parameters))
                parameters = {};
            /* COMPATIBILITY START
             * this ensures backward compatibility for people who passed pathVariables and
             * clauses directly at the root of the `parameters` object. Can be removed in
             * a later version
             */
            if (!parameters.clauses && !parameters.pathVariables) {
                var pathVariables_2 = Object.assign({}, parameters);
                // @ts-ignore
                delete pathVariables_2.where;
                // @ts-ignore
                delete pathVariables_2.orderBy;
                Object.entries(pathVariables_2).forEach(function (entry) {
                    if (typeof entry[1] === 'object') {
                        delete pathVariables_2[entry[0]];
                    }
                });
                parameters = Object.assign({}, { clauses: parameters, pathVariables: pathVariables_2 });
            }
            var defaultParameters = {
                clauses: {},
                pathVariables: {},
                includeMetadataChanges: false,
            };
            parameters = Object.assign(defaultParameters, parameters);
            /* COMPATIBILITY END */
            commit('SET_PATHVARS', parameters.pathVariables);
            // 'doc' mode:
            if (!getters.collectionMode) {
                dispatch('setUserId');
                if (state._conf.logging) {
                    console.log("%c fetch for Firestore PATH: " + getters.firestorePathComplete + " [" + state._conf.firestorePath + "]", 'color: goldenrod');
                }
                return getters.dbRef
                    .get()
                    .then(function (_doc) { return __awaiter(_this, void 0, void 0, function () {
                    var message, id, doc;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!_doc.exists) return [3 /*break*/, 2];
                                // No initial doc found in docMode
                                if (state._conf.sync.preventInitialDocInsertion)
                                    throw 'preventInitialDocInsertion';
                                if (state._conf.logging) {
                                    message = 'inserting initial doc';
                                    console.log("%c [vuex-easy-firestore] " + message + "; for Firestore PATH: " + getters.firestorePathComplete + " [" + state._conf.firestorePath + "]", 'color: MediumSeaGreen');
                                }
                                return [4 /*yield*/, dispatch('insertInitialDoc')
                                    // an error in await here is (somehow) caught in the catch down below
                                ];
                            case 1:
                                _a.sent();
                                // an error in await here is (somehow) caught in the catch down below
                                return [2 /*return*/, _doc];
                            case 2:
                                id = getters.docModeId;
                                doc = getters.cleanUpRetrievedDoc(_doc.data(), id);
                                dispatch('applyHooksAndUpdateState', {
                                    change: 'modified',
                                    id: id,
                                    doc: doc,
                                });
                                return [2 /*return*/, doc];
                        }
                    });
                }); })
                    .catch(function (error$1) {
                    error(error$1);
                    throw error$1;
                });
            }
            // 'collection' mode:
            return dispatch('fetch', parameters).then(function (querySnapshot) {
                if (querySnapshot.done === true)
                    return querySnapshot;
                if (isFunction(querySnapshot.forEach)) {
                    querySnapshot.forEach(function (_doc) {
                        var id = _doc.id;
                        var doc = getters.cleanUpRetrievedDoc(_doc.data(), id);
                        dispatch('applyHooksAndUpdateState', { change: 'added', id: id, doc: doc });
                    });
                }
                return querySnapshot;
            });
        },
        fetchById: function (_a, id) {
            var dispatch = _a.dispatch, getters = _a.getters, state = _a.state;
            return __awaiter(this, void 0, void 0, function () {
                var ref, _doc, doc, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            if (!id)
                                throw 'missing-id';
                            if (!getters.collectionMode)
                                throw 'only-in-collection-mode';
                            ref = getters.dbRef;
                            return [4 /*yield*/, ref.doc(id).get()];
                        case 1:
                            _doc = _b.sent();
                            if (!_doc.exists) {
                                if (state._conf.logging) {
                                    throw "Doc with id \"" + id + "\" not found!";
                                }
                            }
                            doc = getters.cleanUpRetrievedDoc(_doc.data(), id);
                            dispatch('applyHooksAndUpdateState', { change: 'added', id: id, doc: doc });
                            return [2 /*return*/, doc];
                        case 2:
                            e_1 = _b.sent();
                            return [2 /*return*/, error(e_1)];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        applyHooksAndUpdateState: function (
        // this is only on server retrievals
        _a, _b) {
            var getters = _a.getters, state = _a.state, commit = _a.commit, dispatch = _a.dispatch;
            var change = _b.change, id = _b.id, _c = _b.doc, doc = _c === void 0 ? {} : _c;
            var store = this;
            // define storeUpdateFn()
            function storeUpdateFn(_doc) {
                switch (change) {
                    case 'added':
                        commit('INSERT_DOC', _doc);
                        break;
                    case 'removed':
                        commit('DELETE_DOC', id);
                        break;
                    default:
                        dispatch('deleteMissingProps', _doc);
                        commit('PATCH_DOC', _doc);
                        break;
                }
            }
            // get user set sync hook function
            var syncHookFn = state._conf.serverChange[change + 'Hook'];
            if (isFunction(syncHookFn)) {
                syncHookFn(storeUpdateFn, doc, id, store, 'server', change);
            }
            else {
                storeUpdateFn(doc);
            }
        },
        deleteMissingProps: function (_a, doc) {
            var getters = _a.getters, commit = _a.commit;
            var defaultValues = getters.defaultValues;
            var searchTarget = getters.collectionMode ? getters.storeRef[doc.id] : getters.storeRef;
            var compareInfo = compareObjectProps(flatten(doc), // presentIn 0
            flatten(defaultValues), // presentIn 1
            flatten(searchTarget) // presentIn 2
            );
            Object.keys(compareInfo.presentIn).forEach(function (prop) {
                // don't worry about props not in fillables
                if (getters.fillables.length && !getters.fillables.includes(prop)) {
                    return;
                }
                // don't worry about props in guard
                if (getters.guard.includes(prop))
                    return;
                // don't worry about props starting with _sync or _conf
                if (prop.split('.')[0] === '_sync' || prop.split('.')[0] === '_conf')
                    return;
                // where is the prop present?
                var presence = compareInfo.presentIn[prop];
                var propNotInDoc = !presence.includes(0);
                var propNotInDefaultValues = !presence.includes(1);
                // delete props that are not present in the doc and default values
                if (propNotInDoc && propNotInDefaultValues) {
                    var path = getters.collectionMode ? doc.id + "." + prop : prop;
                    return commit('DELETE_PROP', path);
                }
            });
        },
        openDBChannel: function (_a, parameters) {
            var _this = this;
            var getters = _a.getters, state = _a.state, commit = _a.commit, dispatch = _a.dispatch;
            if (parameters === void 0) { parameters = {
                clauses: {},
                pathVariables: {},
                includeMetadataChanges: false,
            }; }
            if (!isPlainObject(parameters))
                parameters = {};
            /* COMPATIBILITY START
             * this ensures backward compatibility for people who passed pathVariables and
             * clauses directly at the root of the `parameters` object. Can be removed in
             * a later version
             */
            if (!parameters.clauses &&
                !parameters.pathVariables &&
                parameters.includeMetadataChanges === undefined) {
                var pathVariables_3 = Object.assign({}, parameters);
                // @ts-ignore
                delete pathVariables_3.where;
                // @ts-ignore
                delete pathVariables_3.orderBy;
                Object.entries(pathVariables_3).forEach(function (entry) {
                    if (typeof entry[1] === 'object') {
                        delete pathVariables_3[entry[0]];
                    }
                });
                parameters = Object.assign({
                    includeMetadataChanges: parameters.includeMetadataChanges || false,
                }, { clauses: parameters, pathVariables: pathVariables_3 });
            }
            var defaultParameters = {
                clauses: {},
                pathVariables: {},
                includeMetadataChanges: false,
            };
            parameters = Object.assign(defaultParameters, parameters);
            /* COMPATIBILITY END */
            dispatch('setUserId');
            // creates promises that can be resolved from outside their scope and that
            // can give their status
            var nicePromise = function () {
                var m = {
                    resolve: null,
                    reject: null,
                    isFulfilled: false,
                    isRejected: false,
                    isPending: true,
                };
                var p = new Promise(function (resolve, reject) {
                    m.resolve = resolve;
                    m.reject = reject;
                });
                Object.assign(p, m);
                p
                    // @ts-ignore
                    .then(function () { return (p.isFulfilled = true); })
                    // @ts-ignore
                    .catch(function () { return (p.isRejected = true); })
                    // @ts-ignore
                    .finally(function () { return (p.isPending = false); });
                return p;
            };
            // set state for clauses and pathVariables
            commit('SET_SYNCCLAUSES', parameters.clauses);
            commit('SET_PATHVARS', parameters.pathVariables);
            var identifier = createFetchIdentifier({
                where: state._conf.sync.where,
                orderBy: state._conf.sync.orderBy,
                pathVariables: state._sync.pathVariables,
            });
            if (isFunction(state._sync.unsubscribe[identifier])) {
                var channelAlreadyOpenError = "openDBChannel was already called for these clauses and pathvariables. Identifier: " + identifier;
                if (state._conf.logging) {
                    console.log(channelAlreadyOpenError);
                }
                return Promise.reject(channelAlreadyOpenError);
            }
            // getters.dbRef should already have pathVariables swapped out
            var dbRef = getters.dbRef;
            // apply where and orderBy clauses
            if (getters.collectionMode) {
                getters.getWhereArrays().forEach(function (whereParams) {
                    dbRef = dbRef.where.apply(dbRef, whereParams);
                });
                if (state._conf.sync.orderBy.length) {
                    dbRef = dbRef.orderBy.apply(dbRef, state._conf.sync.orderBy);
                }
            }
            // log
            if (state._conf.logging) {
                console.log("%c openDBChannel for Firestore PATH: " + getters.firestorePathComplete + " [" + state._conf.firestorePath + "]", 'color: goldenrod');
            }
            var initialPromise = nicePromise();
            var refreshedPromise = nicePromise();
            var streamingPromise = nicePromise();
            var gotFirstLocalResponse = false;
            var gotFirstServerResponse = false;
            var includeMetadataChanges = parameters.includeMetadataChanges;
            var streamingStart = function () {
                // create a promise for the life of the snapshot that can be resolved from
                // outside its scope. This promise will be resolved when the user calls
                // closeDBChannel, or rejected if the stream is ended prematurely by the
                // error() callback
                state._sync.streaming[identifier] = streamingPromise;
                initialPromise.resolve({
                    refreshed: includeMetadataChanges ? refreshedPromise : null,
                    streaming: streamingPromise,
                    stop: function () { return dispatch('closeDBChannel', { _identifier: identifier }); },
                });
            };
            var streamingStop = function (error) {
                // when this function is called by the error callback of onSnapshot, the
                // subscription will actually already have been cancelled
                unsubscribe();
                if (initialPromise.isPending) {
                    initialPromise.reject(error);
                }
                if (refreshedPromise.isPending) {
                    refreshedPromise.reject(error);
                }
                streamingPromise.reject(error);
                state._sync.patching = 'error';
                state._sync.unsubscribe[identifier] = null;
                state._sync.streaming[identifier] = null;
            };
            var processDocument = function (data) {
                var doc = getters.cleanUpRetrievedDoc(data, getters.docModeId);
                dispatch('applyHooksAndUpdateState', {
                    change: 'modified',
                    id: getters.docModeId,
                    doc: doc,
                });
            };
            var processCollection = function (docChanges) {
                docChanges.forEach(function (change) {
                    var doc = getters.cleanUpRetrievedDoc(change.doc.data(), change.doc.id);
                    dispatch('applyHooksAndUpdateState', {
                        change: change.type,
                        id: change.doc.id,
                        doc: doc,
                    });
                });
            };
            var unsubscribe = dbRef.onSnapshot({ includeMetadataChanges: includeMetadataChanges }, function (querySnapshot) { return __awaiter(_this, void 0, void 0, function () {
                var docChanges, message, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!querySnapshot.metadata.fromCache) return [3 /*break*/, 1];
                            // if it's the very first call, we are at the initial app load. If so, we'll use
                            // the data in cache (if available) to populate the state.
                            if (!gotFirstLocalResponse) {
                                // 'doc' mode:
                                if (!getters.collectionMode) {
                                    // note: we don't want to insert a document ever when the data comes from cache,
                                    // and we don't want to start the app if the data doesn't exist (no persistence)
                                    if (querySnapshot.data()) {
                                        processDocument(querySnapshot.data());
                                        streamingStart();
                                    }
                                }
                                // 'collection' mode
                                else {
                                    processCollection(querySnapshot.docChanges());
                                    streamingStart();
                                }
                                gotFirstLocalResponse = true;
                            }
                            else if (gotFirstLocalResponse) {
                                // it's not the first call and it's a change from cache
                                // normally we only need to listen to the server changes, but there's an edge case here:
                                // case: "a permission is removed server side, and instead of this being notified
                                // by firestore from the _server side_, it only notifies this from the cache...
                                if (getters.collectionMode) {
                                    docChanges = querySnapshot.docChanges();
                                    docChanges.forEach(function (change) {
                                        // only do stuff on "removed" !!
                                        if (change.type === 'removed') {
                                            var doc = getters.cleanUpRetrievedDoc(change.doc.data(), change.doc.id);
                                            dispatch('applyHooksAndUpdateState', {
                                                change: change.type,
                                                id: change.doc.id,
                                                doc: doc,
                                            });
                                        }
                                    });
                                }
                            }
                            return [3 /*break*/, 13];
                        case 1:
                            if (!querySnapshot.metadata.hasPendingWrites) return [3 /*break*/, 2];
                            return [3 /*break*/, 13];
                        case 2:
                            if (!!getters.collectionMode) return [3 /*break*/, 11];
                            if (!!querySnapshot.exists) return [3 /*break*/, 9];
                            if (!!state._conf.sync.preventInitialDocInsertion) return [3 /*break*/, 7];
                            if (state._conf.logging) {
                                message = gotFirstServerResponse
                                    ? 'recreating doc after remote deletion'
                                    : 'inserting initial doc';
                                console.log("%c [vuex-easy-firestore] " + message + "; for Firestore PATH: " + getters.firestorePathComplete + " [" + state._conf.firestorePath + "]", 'color: MediumSeaGreen');
                            }
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, dispatch('insertInitialDoc')
                                // if the initial document was successfully inserted
                            ];
                        case 4:
                            _a.sent();
                            // if the initial document was successfully inserted
                            if (initialPromise.isPending) {
                                streamingStart();
                            }
                            if (refreshedPromise.isPending) {
                                refreshedPromise.resolve();
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            // we close the channel ourselves. Firestore does not, as it leaves the
                            // channel open as long as the user has read rights on the document, even
                            // if it does not exist. But since the dev enabled `insertInitialDoc`,
                            // it makes some sense to close as we can assume the user should have had
                            // write rights
                            streamingStop(error_1);
                            return [3 /*break*/, 6];
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            streamingStop('preventInitialDocInsertion');
                            _a.label = 8;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            processDocument(querySnapshot.data());
                            if (initialPromise.isPending) {
                                streamingStart();
                            }
                            // the promise should still be pending at this point only if there is no persistence,
                            // as only then the first call to our listener will have `fromCache` === `false`
                            if (refreshedPromise.isPending) {
                                refreshedPromise.resolve();
                            }
                            _a.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            processCollection(querySnapshot.docChanges());
                            if (initialPromise.isPending) {
                                streamingStart();
                            }
                            if (refreshedPromise.isPending) {
                                refreshedPromise.resolve();
                            }
                            _a.label = 12;
                        case 12:
                            gotFirstServerResponse = true;
                            _a.label = 13;
                        case 13: return [2 /*return*/];
                    }
                });
            }); }, streamingStop);
            state._sync.unsubscribe[identifier] = unsubscribe;
            return initialPromise;
        },
        closeDBChannel: function (_a, _b) {
            var getters = _a.getters, state = _a.state, commit = _a.commit, dispatch = _a.dispatch;
            var _c = _b === void 0 ? {
                clearModule: false,
                _identifier: null,
            } : _b, _d = _c.clearModule, clearModule = _d === void 0 ? false : _d, _e = _c._identifier, _identifier = _e === void 0 ? null : _e;
            var identifier = _identifier ||
                createFetchIdentifier({
                    where: state._conf.sync.where,
                    orderBy: state._conf.sync.orderBy,
                    pathVariables: state._sync.pathVariables,
                });
            var unsubscribeDBChannel = state._sync.unsubscribe[identifier];
            if (isFunction(unsubscribeDBChannel)) {
                unsubscribeDBChannel();
                state._sync.streaming[identifier].resolve();
                state._sync.streaming[identifier] = null;
                state._sync.unsubscribe[identifier] = null;
            }
            if (clearModule) {
                commit('RESET_VUEX_EASY_FIRESTORE_STATE');
            }
        },
        set: function (_a, doc) {
            var commit = _a.commit, dispatch = _a.dispatch, getters = _a.getters, state = _a.state;
            if (!doc)
                return;
            if (!getters.collectionMode) {
                return dispatch('patch', doc);
            }
            var id = getId(doc);
            if (!id ||
                (!state._conf.statePropName && !state[id]) ||
                (state._conf.statePropName && !state[state._conf.statePropName][id])) {
                return dispatch('insert', doc);
            }
            return dispatch('patch', doc);
        },
        insert: function (_a, doc) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var store = this;
            // check payload
            if (!doc)
                return;
            // check userId
            dispatch('setUserId');
            var newDoc = doc;
            if (!newDoc.id)
                newDoc.id = getters.dbRef.doc().id;
            // apply default values
            var newDocWithDefaults = setDefaultValues(newDoc, state._conf.sync.defaultValues);
            // define the firestore update
            function firestoreUpdateFn(_doc) {
                return dispatch('insertDoc', _doc);
            }
            // define the store update
            function storeUpdateFn(_doc) {
                commit('INSERT_DOC', _doc);
                // check for a hook after local change before sync
                if (state._conf.sync.insertHookBeforeSync) {
                    return state._conf.sync.insertHookBeforeSync(firestoreUpdateFn, _doc, store);
                }
                return firestoreUpdateFn(_doc);
            }
            // check for a hook before local change
            if (state._conf.sync.insertHook) {
                return state._conf.sync.insertHook(storeUpdateFn, newDocWithDefaults, store);
            }
            return storeUpdateFn(newDocWithDefaults);
        },
        insertBatch: function (_a, docs) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var store = this;
            // check payload
            if (!isArray(docs) || !docs.length)
                return [];
            // check userId
            dispatch('setUserId');
            var newDocs = docs.reduce(function (carry, _doc) {
                var newDoc = getValueFromPayloadPiece(_doc);
                if (!newDoc.id)
                    newDoc.id = getters.dbRef.doc().id;
                carry.push(newDoc);
                return carry;
            }, []);
            // define the store update
            function storeUpdateFn(_docs) {
                _docs.forEach(function (_doc) {
                    commit('INSERT_DOC', _doc);
                });
                return dispatch('insertDoc', _docs);
            }
            // check for a hook before local change
            if (state._conf.sync.insertBatchHook) {
                return state._conf.sync.insertBatchHook(storeUpdateFn, newDocs, store);
            }
            return storeUpdateFn(newDocs);
        },
        patch: function (_a, doc) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var store = this;
            // check payload
            if (!doc)
                return;
            var id = getters.collectionMode ? getId(doc) : getters.docModeId;
            var value = getters.collectionMode ? getValueFromPayloadPiece(doc) : doc;
            if (!id && getters.collectionMode)
                return error('patch-missing-id');
            // check userId
            dispatch('setUserId');
            // add id to value
            if (!value.id)
                value.id = id;
            // define the firestore update
            function firestoreUpdateFn(_val) {
                return dispatch('patchDoc', { id: id, doc: copy(_val) });
            }
            // define the store update
            function storeUpdateFn(_val) {
                commit('PATCH_DOC', _val);
                // check for a hook after local change before sync
                if (state._conf.sync.patchHookBeforeSync) {
                    return state._conf.sync.patchHookBeforeSync(firestoreUpdateFn, _val, store);
                }
                return firestoreUpdateFn(_val);
            }
            // check for a hook before local change
            if (state._conf.sync.patchHook) {
                return state._conf.sync.patchHook(storeUpdateFn, value, store);
            }
            return storeUpdateFn(value);
        },
        patchBatch: function (_a, _b) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var doc = _b.doc, _c = _b.ids, ids = _c === void 0 ? [] : _c;
            var store = this;
            // check payload
            if (!doc)
                return [];
            if (!isArray(ids) || !ids.length)
                return [];
            // check userId
            dispatch('setUserId');
            // define the store update
            function storeUpdateFn(_doc, _ids) {
                _ids.forEach(function (_id) {
                    commit('PATCH_DOC', __assign({ id: _id }, _doc));
                });
                return dispatch('patchDoc', { ids: _ids, doc: _doc });
            }
            // check for a hook before local change
            if (state._conf.sync.patchBatchHook) {
                return state._conf.sync.patchBatchHook(storeUpdateFn, doc, ids, store);
            }
            return storeUpdateFn(doc, ids);
        },
        delete: function (_a, id) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var store = this;
            // check payload
            if (!id)
                return;
            // check userId
            dispatch('setUserId');
            // define the firestore update
            function firestoreUpdateFnId(_id) {
                return dispatch('deleteDoc', _id);
            }
            function firestoreUpdateFnPath(_path) {
                return dispatch('deleteProp', _path);
            }
            // define the store update
            function storeUpdateFn(_id) {
                // id is a path
                var pathDelete = _id.includes('.') || !getters.collectionMode;
                if (pathDelete) {
                    var path = _id;
                    if (!path)
                        return error('delete-missing-path');
                    commit('DELETE_PROP', path);
                    // check for a hook after local change before sync
                    if (state._conf.sync.deleteHookBeforeSync) {
                        return state._conf.sync.deleteHookBeforeSync(firestoreUpdateFnPath, path, store);
                    }
                    return firestoreUpdateFnPath(path);
                }
                if (!_id)
                    return error('delete-missing-id');
                commit('DELETE_DOC', _id);
                // check for a hook after local change before sync
                if (state._conf.sync.deleteHookBeforeSync) {
                    return state._conf.sync.deleteHookBeforeSync(firestoreUpdateFnId, _id, store);
                }
                return firestoreUpdateFnId(_id);
            }
            // check for a hook before local change
            if (state._conf.sync.deleteHook) {
                return state._conf.sync.deleteHook(storeUpdateFn, id, store);
            }
            return storeUpdateFn(id);
        },
        deleteBatch: function (_a, ids) {
            var state = _a.state, getters = _a.getters, commit = _a.commit, dispatch = _a.dispatch;
            var store = this;
            // check payload
            if (!isArray(ids) || !ids.length)
                return [];
            // check userId
            dispatch('setUserId');
            // define the store update
            function storeUpdateFn(_ids) {
                _ids.forEach(function (_id) {
                    // id is a path
                    var pathDelete = _id.includes('.') || !getters.collectionMode;
                    if (pathDelete) {
                        var path = _id;
                        if (!path)
                            return error('delete-missing-path');
                        commit('DELETE_PROP', path);
                        return dispatch('deleteProp', path);
                    }
                    if (!_id)
                        return error('delete-missing-id');
                    commit('DELETE_DOC', _id);
                    return dispatch('deleteDoc', _id);
                });
            }
            // check for a hook before local change
            if (state._conf.sync.deleteBatchHook) {
                return state._conf.sync.deleteBatchHook(storeUpdateFn, ids, store);
            }
            return storeUpdateFn(ids);
        },
        _stopPatching: function (_a) {
            var state = _a.state, commit = _a.commit;
            if (state._sync.stopPatchingTimeout) {
                clearTimeout(state._sync.stopPatchingTimeout);
            }
            state._sync.stopPatchingTimeout = setTimeout(function (_) {
                state._sync.patching = false;
            }, 300);
        },
        _startPatching: function (_a) {
            var state = _a.state, commit = _a.commit;
            if (state._sync.stopPatchingTimeout) {
                clearTimeout(state._sync.stopPatchingTimeout);
            }
            state._sync.patching = true;
        },
    };
}

/**
 * A function returning the getters object
 *
 * @export
 * @param {*} Firebase The Firebase dependency
 * @returns {AnyObject} the getters object
 */
function pluginGetters (Firebase) {
    return {
        firestorePathComplete: function (state, getters) {
            var path = state._conf.firestorePath;
            Object.keys(state._sync.pathVariables).forEach(function (key) {
                var pathPiece = state._sync.pathVariables[key];
                path = path.replace("{" + key + "}", "" + pathPiece);
            });
            var requireUser = path.includes('{userId}');
            if (requireUser) {
                var userId = state._sync.userId;
                if (getters.signedIn && isString(userId) && userId !== '' && userId !== '{userId}') {
                    path = path.replace('{userId}', userId);
                }
            }
            return path;
        },
        signedIn: function (state, getters, rootState, rootGetters) {
            var requireUser = state._conf.firestorePath.includes('{userId}');
            if (!requireUser)
                return true;
            return state._sync.signedIn;
        },
        dbRef: function (state, getters, rootState, rootGetters) {
            var path = getters.firestorePathComplete;
            return getters.collectionMode
                ? Firebase.firestore().collection(path)
                : Firebase.firestore().doc(path);
        },
        storeRef: function (state, getters, rootState) {
            var path = state._conf.statePropName
                ? state._conf.moduleName + "/" + state._conf.statePropName
                : state._conf.moduleName;
            return getDeepRef(rootState, path);
        },
        collectionMode: function (state, getters, rootState) {
            return state._conf.firestoreRefType.toLowerCase() === 'collection';
        },
        docModeId: function (state, getters) {
            return getters.firestorePathComplete.split('/').pop();
        },
        fillables: function (state) {
            var fillables = state._conf.sync.fillables;
            if (!fillables.length)
                return fillables;
            return fillables.concat(['updated_at', 'updated_by', 'id', 'created_at', 'created_by']);
        },
        guard: function (state) {
            return state._conf.sync.guard.concat(['_conf', '_sync']);
        },
        defaultValues: function (state, getters) {
            return merge(state._conf.sync.defaultValues, state._conf.serverChange.defaultValues // depreciated
            );
        },
        cleanUpRetrievedDoc: function (state, getters, rootState, rootGetters) { return function (doc, id) {
            var defaultValues = merge(getters.defaultValues, state._conf.serverChange.convertTimestamps);
            var cleanDoc = setDefaultValues(doc, defaultValues);
            cleanDoc.id = id;
            return cleanDoc;
        }; },
        prepareForPatch: function (state, getters, rootState, rootGetters) { return function (ids, doc) {
            if (ids === void 0) { ids = []; }
            if (doc === void 0) { doc = {}; }
            // get relevant data from the storeRef
            var collectionMode = getters.collectionMode;
            if (!collectionMode)
                ids.push(getters.docModeId);
            // returns {object} -> {id: data}
            return ids.reduce(function (carry, id) {
                var patchData = {};
                // retrieve full object in case there's an empty doc passed
                if (!Object.keys(doc).length) {
                    patchData = collectionMode ? getters.storeRef[id] : getters.storeRef;
                }
                else {
                    patchData = doc;
                }
                // set default fields
                patchData.updated_at = new Date();
                patchData.updated_by = state._sync.userId;
                // clean up item
                var cleanedPatchData = filter(patchData, getters.fillables, getters.guard);
                var itemToUpdate = flatten(cleanedPatchData);
                // add id (required to get ref later at apiHelpers.ts)
                // @ts-ignore
                itemToUpdate.id = id;
                carry[id] = itemToUpdate;
                return carry;
            }, {});
        }; },
        prepareForPropDeletion: function (state, getters, rootState, rootGetters) { return function (path) {
            var _a;
            if (path === void 0) { path = ''; }
            var collectionMode = getters.collectionMode;
            var patchData = {};
            // set default fields
            patchData.updated_at = new Date();
            patchData.updated_by = state._sync.userId;
            // add fillable and guard defaults
            // clean up item
            var cleanedPatchData = filter(patchData, getters.fillables, getters.guard);
            // add id (required to get ref later at apiHelpers.ts)
            var id, cleanedPath;
            if (collectionMode) {
                id = path.substring(0, path.indexOf('.'));
                cleanedPath = path.substring(path.indexOf('.') + 1);
            }
            else {
                id = getters.docModeId;
                cleanedPath = path;
            }
            cleanedPatchData[cleanedPath] = Firebase.firestore.FieldValue.delete();
            cleanedPatchData.id = id;
            return _a = {}, _a[id] = cleanedPatchData, _a;
        }; },
        prepareForInsert: function (state, getters, rootState, rootGetters) { return function (items) {
            if (items === void 0) { items = []; }
            // add fillable and guard defaults
            return items.reduce(function (carry, item) {
                // set default fields
                item.created_at = new Date();
                item.created_by = state._sync.userId;
                // clean up item
                item = filter(item, getters.fillables, getters.guard);
                carry.push(item);
                return carry;
            }, []);
        }; },
        prepareInitialDocForInsert: function (state, getters, rootState, rootGetters) { return function (doc) {
            // add fillable and guard defaults
            // set default fields
            doc.created_at = new Date();
            doc.created_by = state._sync.userId;
            doc.id = getters.docModeId;
            // clean up item
            doc = filter(doc, getters.fillables, getters.guard);
            return doc;
        }; },
        getWhereArrays: function (state, getters) { return function (whereArrays) {
            if (!isArray(whereArrays))
                whereArrays = state._conf.sync.where;
            return whereArrays.map(function (whereClause) {
                return whereClause.map(function (param) {
                    if (!isString(param))
                        return param;
                    var cleanedParam = param;
                    getPathVarMatches(param).forEach(function (key) {
                        var keyRegEx = new RegExp("{" + key + "}", 'g');
                        if (key === 'userId') {
                            cleanedParam = cleanedParam.replace(keyRegEx, state._sync.userId);
                            return;
                        }
                        if (!Object.keys(state._sync.pathVariables).includes(key)) {
                            return error('missing-path-variables');
                        }
                        var varVal = state._sync.pathVariables[key];
                        // if path is only a param we need to just assign to avoid stringification
                        if (param === "{" + key + "}") {
                            cleanedParam = varVal;
                            return;
                        }
                        cleanedParam = cleanedParam.replace(keyRegEx, varVal);
                    });
                    return cleanedParam;
                });
            });
        }; },
    };
}

/**
 * Check the config for type errors for non-TypeScript users
 *
 * @export
 * @param {IEasyFirestoreModule} config
 * @returns {boolean} true if no errors, false if errors
 */
function errorCheck (config) {
    var errors = [];
    var reqProps = ['firestorePath', 'moduleName'];
    reqProps.forEach(function (prop) {
        if (!config[prop]) {
            errors.push("Missing `" + prop + "` in your module!");
        }
    });
    if (config.statePropName !== null && !isString(config.statePropName)) {
        errors.push('statePropName must be null or a string');
    }
    if (isString(config.statePropName) && /(\.|\/)/.test(config.statePropName)) {
        errors.push("statePropName must be null or a string without special characters");
    }
    if (/\./.test(config.moduleName)) {
        errors.push("moduleName must only include letters from [a-z] and forward slashes '/'");
    }
    var syncProps = [
        'where',
        'orderBy',
        'fillables',
        'guard',
        'defaultValues',
        'insertHook',
        'patchHook',
        'deleteHook',
        'insertBatchHook',
        'patchBatchHook',
        'deleteBatchHook',
    ];
    syncProps.forEach(function (prop) {
        if (config[prop]) {
            errors.push("We found `" + prop + "` on your module, are you sure this shouldn't be inside a prop called `sync`?");
        }
    });
    var serverChangeProps = ['modifiedHook', 'defaultValues', 'addedHook', 'removedHook'];
    serverChangeProps.forEach(function (prop) {
        if (config[prop]) {
            errors.push("We found `" + prop + "` on your module, are you sure this shouldn't be inside a prop called `serverChange`?");
        }
    });
    var fetchProps = ['docLimit'];
    fetchProps.forEach(function (prop) {
        if (config[prop]) {
            errors.push("We found `" + prop + "` on your module, are you sure this shouldn't be inside a prop called `fetch`?");
        }
    });
    var numberProps = ['docLimit'];
    numberProps.forEach(function (prop) {
        var _prop = config.fetch[prop];
        if (!isNumber(_prop))
            errors.push("`" + prop + "` should be a Number, but is not.");
    });
    var functionProps = [
        'insertHook',
        'patchHook',
        'deleteHook',
        'insertBatchHook',
        'patchBatchHook',
        'deleteBatchHook',
        'addedHook',
        'modifiedHook',
        'removedHook',
    ];
    functionProps.forEach(function (prop) {
        var _prop = syncProps.includes(prop) ? config.sync[prop] : config.serverChange[prop];
        if (!isFunction(_prop))
            errors.push("`" + prop + "` should be a Function, but is not.");
    });
    var objectProps = ['sync', 'serverChange', 'defaultValues', 'fetch'];
    objectProps.forEach(function (prop) {
        var _prop = prop === 'defaultValues' ? config.sync[prop] : config[prop];
        if (!isPlainObject(_prop))
            errors.push("`" + prop + "` should be an Object, but is not.");
    });
    var stringProps = ['firestorePath', 'firestoreRefType', 'moduleName'];
    stringProps.forEach(function (prop) {
        var _prop = config[prop];
        if (!isString(_prop))
            errors.push("`" + prop + "` should be a String, but is not.");
    });
    var arrayProps = ['where', 'orderBy', 'fillables', 'guard'];
    arrayProps.forEach(function (prop) {
        var _prop = config.sync[prop];
        if (!isArray(_prop))
            errors.push("`" + prop + "` should be an Array, but is not.");
    });
    if (errors.length) {
        console.group('[vuex-easy-firestore] ERRORS:');
        console.error("Module: " + config.moduleName);
        errors.forEach(function (e) { return console.error(' - ', e); });
        console.groupEnd();
        return false;
    }
    return true;
}

/**
 * A function that returns a vuex module object with seamless 2-way sync for firestore.
 *
 * @param {IEasyFirestoreModule} userConfig Takes a config object per module
 * @param {*} FirebaseDependency The Firebase dependency (non-instanciated), defaults to the Firebase peer dependency if left blank.
 * @returns {IStore} the module ready to be included in your vuex store
 */
function iniModule (userConfig, FirebaseDependency) {
    // prepare state._conf
    var conf = copy(merge({ state: {}, mutations: {}, actions: {}, getters: {} }, defaultConfig, userConfig));
    if (!errorCheck(conf))
        return;
    var userState = conf.state;
    var userMutations = conf.mutations;
    var userActions = conf.actions;
    var userGetters = conf.getters;
    delete conf.state;
    delete conf.mutations;
    delete conf.actions;
    delete conf.getters;
    // prepare rest of state
    var docContainer = {};
    if (conf.statePropName)
        docContainer[conf.statePropName] = {};
    var restOfState = merge(userState, docContainer);
    // if 'doc' mode, set merge initial state onto default values
    if (conf.firestoreRefType === 'doc') {
        var defaultValsInState = conf.statePropName ? restOfState[conf.statePropName] : restOfState;
        conf.sync.defaultValues = copy(merge(defaultValsInState, conf.sync.defaultValues));
    }
    return {
        namespaced: true,
        state: merge(pluginState(), restOfState, { _conf: conf }),
        mutations: __assign(__assign({}, userMutations), pluginMutations(merge(userState, { _conf: conf }))),
        actions: __assign(__assign({}, userActions), pluginActions(FirebaseDependency)),
        getters: __assign(__assign({}, userGetters), pluginGetters(FirebaseDependency)),
    };
}

// Firebase
/**
 * Create vuex-easy-firestore modules. Add as single plugin to Vuex Store.
 *
 * @export
 * @param {(IEasyFirestoreModule | IEasyFirestoreModule[])} easyFirestoreModule A vuex-easy-firestore module (or array of modules) with proper configuration as per the documentation.
 * @param {{logging?: boolean, FirebaseDependency?: any}} extraConfig An object with `logging` and `FirebaseDependency` props. `logging` enables console logs for debugging. `FirebaseDependency` is the non-instanciated Firebase class you can pass. (defaults to the Firebase peer dependency)
 * @returns {*}
 */
function vuexEasyFirestore(easyFirestoreModule, _a) {
    var _b = _a === void 0 ? {
        logging: false,
        preventInitialDocInsertion: false,
        FirebaseDependency: firebase,
    } : _a, _c = _b.logging, logging = _c === void 0 ? false : _c, _d = _b.preventInitialDocInsertion, preventInitialDocInsertion = _d === void 0 ? false : _d, _e = _b.FirebaseDependency, FirebaseDependency = _e === void 0 ? firebase : _e;
    if (FirebaseDependency) {
        setFirebaseDependency(FirebaseDependency);
        setFirebaseDependency$1(FirebaseDependency);
    }
    return function (store) {
        // Get an array of config files
        if (!isArray(easyFirestoreModule))
            easyFirestoreModule = [easyFirestoreModule];
        // Create a module for each config file
        easyFirestoreModule.forEach(function (config) {
            config.logging = logging;
            if (config.sync && config.sync.preventInitialDocInsertion === undefined) {
                config.sync.preventInitialDocInsertion = preventInitialDocInsertion;
            }
            var moduleName = getKeysFromPath(config.moduleName);
            store.registerModule(moduleName, iniModule(config, FirebaseDependency));
        });
    };
}

export default vuexEasyFirestore;
export { arrayRemove, arrayUnion, increment, vuexEasyFirestore };
