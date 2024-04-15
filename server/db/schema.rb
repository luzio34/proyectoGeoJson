ActiveRecord::Schema[7.1].define(version: 2024_04_09_165458) do
  create_table "comments", force: :cascade do |t|
    t.integer "feature_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feature_id"], name: "index_comments_on_feature_id"
  end

  create_table "features", force: :cascade do |t|
    t.string "external_id"
    t.decimal "magnitude"
    t.string "place"
    t.datetime "time"
    t.string "url"
    t.boolean "tsunami"
    t.string "mag_type"
    t.string "title"
    t.decimal "longitude"
    t.decimal "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "features"
end
