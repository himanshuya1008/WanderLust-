import sql from "../config/db.js";

// In-memory persistent cache / fallback for active session listings
let dynamicListings = [];

export const getListings = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, guests } = req.query;

    // If database is available, we can query creations/listings or return unified items
    let results = [...dynamicListings];

    if (category && category !== "all") {
      results = results.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      results = results.filter((item) =>
        item.city?.toLowerCase().includes(q) ||
        item.country?.toLowerCase().includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      results = results.filter((item) => item.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((item) => item.price <= Number(maxPrice));
    }
    if (guests) {
      results = results.filter((item) => item.maxGuests >= Number(guests));
    }

    res.json({ success: true, count: results.length, listings: results });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = dynamicListings.find((item) => item.id === id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    res.json({ success: true, listing });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const userId = req.auth ? (await req.auth()).userId : "demo_host";
    const {
      title,
      tagline,
      category,
      type,
      city,
      country,
      price,
      cleaningFee,
      serviceFee,
      maxGuests,
      bedrooms,
      beds,
      baths,
      description,
      amenities,
      images,
      hostName
    } = req.body;

    const newListing = {
      id: `wl-${Date.now()}`,
      userId,
      title: title || "New WanderLust Haven",
      tagline: tagline || "Stunning private vacation rental",
      category: category || "villas",
      type: type || "Entire Luxury Space",
      city: city || "Kyoto",
      country: country || "Japan",
      price: Number(price) || 25000,
      cleaningFee: Number(cleaningFee) || 2500,
      serviceFee: Number(serviceFee) || 1800,
      rating: 5.0,
      reviewsCount: 1,
      maxGuests: Number(maxGuests) || 4,
      bedrooms: Number(bedrooms) || 2,
      beds: Number(beds) || 2,
      baths: Number(baths) || 2,
      highlight: "New Listing",
      images: Array.isArray(images) && images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80"
      ],
      host: {
        name: hostName || "WanderLust Host",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
        isSuperhost: true,
        hostingYears: 1,
        responseRate: "100%",
        responseTime: "within an hour"
      },
      description: description || "A wonderful curated home ready to welcome travelers.",
      amenities: Array.isArray(amenities) && amenities.length > 0 ? amenities : ["WiFi", "Kitchen", "Air conditioning", "Terrace"],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: "WanderLust Welcoming Review",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
          date: "Just now",
          rating: 5,
          comment: "Newly listed with exceptional craftsmanship and modern comfort!"
        }
      ],
      createdAt: new Date().toISOString()
    };

    dynamicListings.unshift(newListing);

    res.json({ success: true, listing: newListing, message: "Listing published successfully!" });
  } catch (error) {
    console.error("createListing error:", error);
    res.json({ success: false, error: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, author, avatar } = req.body;

    const listing = dynamicListings.find((item) => item.id === id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    const review = {
      id: `rev-${Date.now()}`,
      author: author || "Wanderer Traveler",
      avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      rating: Number(rating) || 5,
      comment: comment || "Wonderful stay! Highly recommended."
    };

    listing.reviews.unshift(review);
    listing.reviewsCount = listing.reviews.length;
    listing.rating = Number(
      (listing.reviews.reduce((acc, r) => acc + r.rating, 0) / listing.reviews.length).toFixed(2)
    );

    res.json({ success: true, review, listing, message: "Review posted successfully!" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
