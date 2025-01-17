"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistsModule = void 0;
const common_1 = require("@nestjs/common");
const playlists_service_1 = require("./playlists.service");
const playlists_controller_1 = require("./playlists.controller");
const typeorm_1 = require("@nestjs/typeorm");
const playlist_entity_1 = require("./playlist.entity");
const songs_module_1 = require("../songs/songs.module");
let PlaylistsModule = class PlaylistsModule {
};
exports.PlaylistsModule = PlaylistsModule;
exports.PlaylistsModule = PlaylistsModule = __decorate([
    (0, common_1.Module)({
        providers: [playlists_service_1.PlaylistsService],
        imports: [songs_module_1.SongsModule, typeorm_1.TypeOrmModule.forFeature([playlist_entity_1.Playlist])],
        controllers: [playlists_controller_1.PlaylistsController],
    })
], PlaylistsModule);
//# sourceMappingURL=playlists.module.js.map