
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { text, relationship, password, timestamp, select, image, checkbox } from '@keystone-6/core/fields';

import type { Lists } from '.keystone/types';

type UserSession = {
  data: {
    id: string
    isAdmin: boolean
    isEditor: boolean
  }
}

// Helper function that limits an operation to admin users only
const isAdmin = ({ session }: { session: UserSession }) => {
  if (!session || !session.data) {
    return false;
  }

  return session.data.isAdmin
};

// Helper function that limits an operation to admins or editors
const isAdminOrEditor = ({ session }: { session: UserSession }) => {
  if (!session || !session.data) {
    return false;
  }

  return session.data.isAdmin || session.data.isEditor
};

export const lists: Lists = {
  User: list({
    access: {
      operation: {
        query: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },

    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      isAdmin: checkbox(),
      isEditor: checkbox(),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    access: {
      operation: {
        query: allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
      },
    },

    ui: {
      labelField: "title",
      listView: {
        initialColumns: ["id", "title", "imageFile", "collections"]
      }
    },

    fields: {
      title: text(),

      imageFile: image({ storage: 'remote_images' }),

      collections: relationship({
        ref: 'Collection.posts',

        many: true,

        ui: {
          displayMode: 'select'
        },
      }),
    },
  }),

  Collection: list({
    access: {
      operation: {
        query: allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
      },
    },

    ui: {
      labelField: "name"
    },

    fields: {
      name: text(),
      slug: text({
        isIndexed: true,
        ui: {
          description: "Generated automatically.",
          itemView: {
            fieldMode: "read"
          }
        },
        hooks: {
          resolveInput: async ({ resolvedData, }) => {
            if (resolvedData.name) {
              return (resolvedData.name as string).toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
            }
          },
        }
      }),

      posts: relationship({
        ref: 'Post.collections',
        many: true,
        ui: {
          hideCreate: true,
        }
      }),
    },
  }),

  HomePage: list({
    access: {
      operation: {
        query: allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
      },
    },

    isSingleton: true,

    fields: {
      header: text(),

      carouselImage1: image({ storage: 'remote_images', label: "Carousel Image 1" }),
      carouselImage2: image({ storage: 'remote_images', label: "Carousel Image 2" }),
      carouselImage3: image({ storage: 'remote_images', label: "Carousel Image 3" }),
      carouselImage4: image({ storage: 'remote_images', label: "Carousel Image 4" }),

      featuredPosts: relationship({
        ref: 'Post',
        many: true,
        ui: {
          hideCreate: true,
          displayMode: "cards",
          cardFields: ["title", "imageFile"],
          linkToItem: true,
          inlineConnect: true,
        }
      })

    },
  }),

  AboutPage: list({
    access: {
      operation: {
        query: allowAll,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
      },
    },

    isSingleton: true,

    fields: {
      header: text(),

      aboutName: text(),

      aboutDescription: text({
        ui: {
          displayMode: "textarea"
        },
        db: {
          nativeType: "Text"
        }
      }),

      aboutImageRight: image({ storage: 'remote_images' }),
      aboutImageLeft: image({ storage: 'remote_images' }),

    },
  })
};
