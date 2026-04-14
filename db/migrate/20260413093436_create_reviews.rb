class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.string :name
      t.string :email
      t.integer :rating
      t.text :body

      t.timestamps
    end
  end
end
