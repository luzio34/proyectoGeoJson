module Api
  class FeaturesController < ApplicationController
    def index
      @features = Feature.all

      # Filtrar por mag_type si se proporciona el parámetro en la consulta
      if params[:filters] && params[:filters][:mag_type]
        @features = @features.where(mag_type: params[:filters][:mag_type])
      end

      
      per_page = params[:per_page] || 1000
      @features = @features.paginate(page: params[:page], per_page: per_page)

      features_array = @features.map do |feature|
        {
          id: feature.id,
          type: 'Feature',
          attributes: {
            external_id: feature.external_id,
            magnitude: feature.magnitude,
            place: feature.place,
            time: feature.time,
            tsunami: feature.tsunami,
            mag_type: feature.mag_type,
            title: feature.title,
            coordinates: {
              longitude: feature.longitude,
              latitude: feature.latitude
            }
          },
          links: {
            external_url: feature.url
          }
        }
      end

      render json: { data: features_array, pagination: pagination_meta(@features) }

      # Renderizar la vista HTML
      #render file: Rails.root.join('app', 'views', 'api', 'features', 'index.html.erb'), layout: false
    end

    private

    def pagination_meta(collection)
      {
        current_page: collection.current_page,
        total: collection.total_entries,
        per_page: collection.per_page
      }
    end
  end
end