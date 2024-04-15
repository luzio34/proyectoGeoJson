require 'httparty'

namespace :fetch_earthquake_data do
  task :execute => :environment do
    response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    data = JSON.parse(response.body)

    data['features'].each do |feature_data|
      properties = feature_data['properties']
      coordinates = feature_data['geometry']['coordinates']
      external_id = feature_data['id']

      next unless properties['title'] && properties['url'] && properties['place'] && properties['magType'] &&
                  coordinates && coordinates[0] && coordinates[1]

      magnitude = properties['mag']
      magnitude_valid = magnitude.is_a?(Numeric) && magnitude.between?(-1.0, 10.0)

      latitude = coordinates[1]
      latitude_valid = latitude.is_a?(Numeric) && latitude.between?(-90.0, 90.0)

      longitude = coordinates[0]
      longitude_valid = longitude.is_a?(Numeric) && longitude.between?(-180.0, 180.0)

      if magnitude_valid && latitude_valid && longitude_valid
        feature = Feature.find_or_initialize_by(external_id: external_id)

        # Verificar si la característica es nueva antes de asignar los atributos
        if feature.new_record?
          feature.assign_attributes(
            external_id: external_id,
            magnitude: magnitude,
            place: properties['place'],
            time: Time.at(properties['time'] / 1000),
            tsunami: properties['tsunami'],
            mag_type: properties['magType'],
            title: properties['title'],
            longitude: longitude,
            latitude: latitude,
            url: properties['url']
          )

          if feature.save
            puts "Característica guardada correctamente."
          else
            puts "Error al guardar la característica:"
            puts feature.errors.full_messages.join(', ')
          end
        else
          puts "Característica encontrada con URL: #{feature.url}. No se guarda nuevamente."
        end
      end
    end
    puts "Se han guardado los datos de los terremotos en la base de datos."
  end
end