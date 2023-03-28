"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var isAdmin = ({ session: session2 }) => {
  if (!session2 || !session2.data) {
    return false;
  }
  return session2.data.isAdmin;
};
var isAdminOrEditor = ({ session: session2 }) => {
  if (!session2 || !session2.data) {
    return false;
  }
  return session2.data.isAdmin || session2.data.isEditor;
};
var lists = {
  User: (0, import_core.list)({
    access: {
      operation: {
        query: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      isAdmin: (0, import_fields.checkbox)(),
      isEditor: (0, import_fields.checkbox)(),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      })
    }
  }),
  Post: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor
      }
    },
    ui: {
      labelField: "title",
      listView: {
        initialColumns: ["id", "title", "imageFile", "collections"]
      }
    },
    fields: {
      title: (0, import_fields.text)(),
      imageFile: (0, import_fields.image)({ storage: "remote_images" }),
      collections: (0, import_fields.relationship)({
        ref: "Collection.posts",
        many: true,
        ui: {
          displayMode: "select"
        }
      })
    }
  }),
  Collection: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor
      }
    },
    ui: {
      labelField: "name"
    },
    fields: {
      name: (0, import_fields.text)(),
      slug: (0, import_fields.text)({
        isIndexed: true,
        ui: {
          description: "Generated automatically.",
          itemView: {
            fieldMode: "read"
          }
        },
        hooks: {
          resolveInput: async ({ resolvedData }) => {
            if (resolvedData.name) {
              return resolvedData.name.toLowerCase().replace(/\s+/g, "-").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
            }
          }
        }
      }),
      posts: (0, import_fields.relationship)({
        ref: "Post.collections",
        many: true,
        ui: {
          hideCreate: true
        }
      })
    }
  }),
  HomePage: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor
      }
    },
    isSingleton: true,
    fields: {
      header: (0, import_fields.text)(),
      carouselImage1: (0, import_fields.image)({ storage: "remote_images", label: "Carousel Image 1" }),
      carouselImage2: (0, import_fields.image)({ storage: "remote_images", label: "Carousel Image 2" }),
      carouselImage3: (0, import_fields.image)({ storage: "remote_images", label: "Carousel Image 3" }),
      carouselImage4: (0, import_fields.image)({ storage: "remote_images", label: "Carousel Image 4" }),
      featuredPosts: (0, import_fields.relationship)({
        ref: "Post",
        many: true,
        ui: {
          hideCreate: true,
          displayMode: "cards",
          cardFields: ["title", "imageFile"],
          linkToItem: true,
          inlineConnect: true
        }
      })
    }
  }),
  AboutPage: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor
      }
    },
    isSingleton: true,
    fields: {
      header: (0, import_fields.text)(),
      aboutName: (0, import_fields.text)(),
      aboutDescription: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        },
        db: {
          nativeType: "Text"
        }
      }),
      aboutImageRight: (0, import_fields.image)({ storage: "remote_images" }),
      aboutImageLeft: (0, import_fields.image)({ storage: "remote_images" })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV != "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  sessionData: "name createdAt isAdmin isEditor",
  secretField: "password"
  // initFirstItem: {
  // if there are no items in the database, by configuring this field
  //   you are asking the Keystone AdminUI to create a new user
  //   providing inputs for these fields
  // fields: ['name', 'email', 'password', 'isAdmin', 'isEditor'],
  // },
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var {
  S3_BUCKET_NAME: bucketName = "",
  S3_REGION: region = "",
  S3_ACCESS_KEY_ID: accessKeyId = "",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "",
  S3_ENDPOINT: endpoint = ""
} = process.env;
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "mysql",
      url: process.env.DATABASE_URL || "",
      additionalPrismaDatasourceProperties: {
        relationMode: "prisma"
      }
    },
    lists,
    session,
    storage: {
      remote_images: {
        kind: "s3",
        type: "image",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        endpoint,
        generateUrl: (path) => {
          const pathname = new URL(path).pathname;
          return `${process.env.S3_IMAGES_CDN_URL}${pathname}`;
        },
        acl: "public-read"
      }
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
