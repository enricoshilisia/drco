// Photography. Unsplash images are placeholders — swap each `src` for the
// firm's own photos (put files in /public/images and use "/images/<file>.jpg").
// See README → "Images you need to supply".

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`;

export type Photo = { src: string; alt: string };

export const images = {
  hero: { src: unsplash("1611348524140-53c9a25263d6"), alt: "Nairobi city skyline at dusk" },
  chambers: { src: unsplash("1606836591695-4d58a73eba1e"), alt: "Glass-walled meeting room in the firm's chambers" },
  library: { src: unsplash("1505664194779-8beaceb93744"), alt: "Law library with bound volumes and busts" },
  reception: { src: unsplash("1604328698692-f76ea9498e76"), alt: "Bright reception and client lounge" },
  office: [
    { src: unsplash("1497366811353-6870744d04b2"), alt: "Boardroom with city views" },
    { src: unsplash("1604328698692-f76ea9498e76"), alt: "Client reception area" },
    { src: unsplash("1497366216548-37526070297c"), alt: "Office corridor" },
    { src: unsplash("1497215728101-856f4ea42174"), alt: "Quiet workspace overlooking the city" },
  ],
  practice: {
    "international-trade-investment": { src: unsplash("1436450412740-6b988f486c6b"), alt: "Columns of a public institution" },
    "litigation-dispute-resolution": { src: unsplash("1575505586569-646b2ca898fc"), alt: "Judge's gavel" },
    "corporate-commercial": { src: unsplash("1454165804606-c3d57bc86b40"), alt: "Advisers reviewing transaction documents" },
    "real-estate-conveyancing": { src: unsplash("1450101499163-c8848c66ca85"), alt: "Signing a sale agreement" },
    "family-succession": { src: unsplash("1423592707957-3b212afa6733"), alt: "Leather-bound books and an open notebook" },
    "employment-labour": { src: unsplash("1521791136064-7986c2920216"), alt: "Handshake between colleagues" },
    "immigration-regulatory": { src: unsplash("1604328698692-f76ea9498e76"), alt: "Bright client reception area" },
  } as Record<string, Photo>,
  posts: {
    "buying-land-in-kenya-due-diligence-checklist": { src: unsplash("1611348524140-53c9a25263d6"), alt: "Nairobi skyline" },
    "protecting-foreign-investment-in-kenya": { src: unsplash("1486406146926-c627a92ad1ab"), alt: "Office towers seen from street level" },
    "data-protection-act-compliance-for-smes": { src: unsplash("1454165804606-c3d57bc86b40"), alt: "Laptops and documents on a desk" },
  } as Record<string, Photo>,
};

export const fallbackPhoto: Photo = images.library;
